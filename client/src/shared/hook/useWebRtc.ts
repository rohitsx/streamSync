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
  const [stream, setStream] = useState<MediaStream | null>();
  const [pc, setPc] = useState<RTCPeerConnection>();
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const polite = useRef(politeInstance);

  useEffect(() => {
    if (pc?.connectionState === "connected") resetPc();

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
    });

    pc && (pc.oniceconnectionstatechange = () => {
      if (pc?.connectionState === "connected") {
        console.log("peer connected");
      }
    });
    setPc(peerConnection);
    return () => {
      resetPc();
    };
  }, []);

  useEffect(() => {
    if (!pc) return;
    pc.ontrack = ({ track, streams }) => {
      track.onunmute = () =>
        audioRef?.current?.srcObject &&
        (audioRef.current.srcObject = streams[0]);
    };
  }, [pc, webSocket]);

  const sendOffer = useCallback(() => {
    if (!pc) return;

    let _stream: MediaStream | null;

    (async () => {
      _stream = await getStream();
      setStream(_stream);
      if (!_stream) return;
      for (const track of _stream.getTracks()) {
        pc.addTrack(track, _stream);
      }
    })();

    pc.onicecandidate = ({ candidate }) =>
      webSocket.send(JSON.stringify({
        candidate: {
          candidate,
          to: stranger,
        },
      }));

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

    return () => {
      stream && closeStream(stream);
    };
  }, [pc]);

  const handleOffer = useCallback(async (e: MessageEvent) => {
    if (!pc) return;
    const { description, candidate } = JSON.parse(e.data);
    if (!description && !candidate) return;

    if (description) {
      const offerCollision = description.type === "offer" &&
        (makingOffer.current || pc.signalingState !== "stable");

      ignoreOffer.current = !polite.current && offerCollision;
      if (ignoreOffer.current) return;

      await pc.setRemoteDescription(description);
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
  }, [pc]);

  useEffect(() => {
    webSocket.addEventListener("message", handleOffer);
    return () => {
      webSocket.removeEventListener("message", handleOffer);
    };
  }, [pc]);

  const resetPc = useCallback(() => {
    console.log(pc);
    if (pc) {
      pc.getSenders().forEach((sender) => sender?.track?.stop());

      pc.close();
      setPc(undefined);

      console.log("clearning the stream", stream);
      stream && closeStream(stream);
      makingOffer.current = false;
      ignoreOffer.current = false;
      polite.current = politeInstance;
    }
  }, [stream, pc]);

  return { pc, sendOffer, handleOffer, resetPc };
}
