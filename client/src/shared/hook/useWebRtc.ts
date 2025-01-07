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

  const start = useCallback(async () => {
    if (pc?.connectionState === "connected") resetPc();

    const newPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.mystunserver.tld" }],
    });
    setPc(newPeerConnection);
  }, [pc]);

  const sendOffer = useCallback(() => {
    if (!pc) return;
    try {
      pc.onnegotiationneeded = async () => {
        makingOffer.current = true;
        await pc.setLocalDescription();
        webSocket.send(JSON.stringify({
          description: {
            description: pc.localDescription,
            to: stranger,
          },
        }));
      };
    } catch (err) {
      console.log(err);
    } finally {
      makingOffer.current = false;
    }
  }, [pc]);

  const handleOffer = useCallback(async () => {
    if (!pc) return;

    const handleMessage = async (e: MessageEvent) => {
      const { description, candidate } = JSON.parse(e.data);
      if (!description || !candidate) return;

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

    try {
      webSocket.addEventListener("message", handleMessage);
    } catch (err) {
      console.log(err);
    }
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [pc]);

  useEffect(() => {
    if (!pc) return;
    pc.ontrack = ({ track, streams }) => {
      track.onunmute = () => {
        if (!audioRef?.current) return;
        if (audioRef.current.srcObject) return;
        audioRef.current.srcObject = streams[0];
      };
    };

    pc.onicecandidate = ({ candidate }) => {
      webSocket.send(JSON.stringify({
        candidate: {
          candidate,
          to: stranger,
        },
      }));
    };

    let stream: MediaStream | null;
    (async () => {
      stream = await getStream();
      if (!stream) return;
      for (const track of stream.getTracks()) pc.addTrack(track, stream);
    })();

    return () => {
      stream && closeStream(stream);
    };
  }, [pc]);

  const resetPc = useCallback(() => {
    if (pc) {
      pc.getSenders().forEach((sender) => {
        if (sender.track) {
          sender.track.stop();
        }
      });

      pc.close();

      makingOffer.current = false;
      ignoreOffer.current = false;
      polite.current = politeInstance;

      setPc(undefined);
    }
  }, [pc]);

  return { start, sendOffer, handleOffer, resetPc };
}
