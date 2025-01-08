import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import useMedia from "@/hook/useMedia";

interface CallProps {
  stranger: string;
  webSocket: WebSocket;
  audioRef: RefObject<HTMLAudioElement> | undefined;
  politeInstance: boolean;
}

export default function useWebRtc(
  { stranger, webSocket, audioRef, politeInstance }: CallProps,
) {
  const { getStream, closeStream } = useMedia();
  const [pc, setPc] = useState<RTCPeerConnection>();
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const polite = useRef(politeInstance);

  useEffect(() => {
    let stream: MediaStream | null;
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
    });

    (async () => {
      stream = await getStream();
      if (!stream) return;
      for (const track of stream.getTracks()) {
        peerConnection.addTrack(track, stream);
      }
    })();

    setPc(peerConnection);
    return () => {
      resetPc();
      stream && closeStream(stream);
    };
  }, []);

  useEffect(() => {
    if (!pc) return;

    pc.onicecandidate = ({ candidate }) =>
      webSocket.send(JSON.stringify({
        candidate: {
          candidate,
          to: stranger,
        },
      }));

    pc.ontrack = ({ track, streams }) =>
      track.onunmute = () =>
        audioRef?.current?.srcObject &&
        (audioRef.current.srcObject = streams[0]);
  }, [pc, webSocket]);

  const sendOffer = useCallback(() => {
    if (!pc) return;

    pc.onnegotiationneeded = async () => {
      try {
        makingOffer.current = true;
        await pc.setLocalDescription();
        webSocket.send(JSON.stringify({
          description: {
            description: pc.localDescription,
            to: stranger,
          },
        }));
      } catch (err) {
        console.log(err);
      } finally {
        makingOffer.current = false;
      }
    };
  }, [pc]);

  useEffect(() => {
    if (!pc) return;

    const handleMessage = async (e: MessageEvent) => {
      const { description, candidate } = JSON.parse(e.data);
      if (!description && !candidate) return;

      if (description) {
        const offerCollision = description.type === "offer" &&
          (makingOffer.current || pc.signalingState !== "stable");

        ignoreOffer.current = !polite.current && offerCollision;
        if (ignoreOffer.current) return;

        await pc.setRemoteDescription(description.description);
        if (description.type !== "offer") return;

        await pc.setLocalDescription();
        webSocket.send(
          JSON.stringify({
            description: { description: pc.localDescription, to: stranger },
          }),
        );
      } else if (candidate) {
        try {
          await pc.addIceCandidate(candidate);
        } catch (err) {
          if (!ignoreOffer) {
            throw err;
          }
        }
      }
    };

    webSocket.addEventListener("message", handleMessage);

    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [pc, webSocket]);

  const resetPc = useCallback(() => {
    if (pc) {
      pc.getSenders().forEach((sender) => sender?.track?.stop());

      pc.close();
      setPc(undefined);

      makingOffer.current = false;
      ignoreOffer.current = false;
      polite.current = politeInstance;
    }
  }, [pc]);

  return { pc, sendOffer, resetPc };
}
