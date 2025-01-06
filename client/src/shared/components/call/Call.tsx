import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useMedia from "@/hook/useMedia";

type CallStatus = "ringing" | "connect" | "connected" | "disconnected";

interface CallProps {
  stranger: string;
  webSocket: WebSocket;
  setHostName: (hostName: string | null) => void;
  audioRef: RefObject<HTMLAudioElement>;
}

export default function Call({ stranger, webSocket, audioRef }: CallProps) {
  const { getStream, closeStream } = useMedia();
  const [pc, setPc] = useState<RTCPeerConnection>();
  const makingOfferRef = useRef(false);
  const ignoreOfferRef = useRef(false);
  const politeRef = useRef(false);
  const iceCandidatesQueue = useRef<RTCIceCandidateInit[]>([]);

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
        makingOfferRef.current = true;
        await pc.setLocalDescription();
        webSocket.send(JSON.stringify({
          offer: {
            description: pc,
            to: stranger,
          },
        }));
      };
    } catch (err) {
      console.log(err);
    } finally {
      makingOfferRef.current = false;
    }
  }, [pc]);

  const handleAnswer = useCallback(() => {
	if (!pc) return;
	try {
	  pc.onnegotiationneeded = async () => {
		await pc.setRemoteDescription();
		await pc.setLocalDescription();
		webSocket.send(JSON.stringify({
		  answer: {
			description: pc,
			to: stranger,
		  },
		}));
	  };
	} catch (err) {
	  console.log(err);
	}
  }, [pc]);

  useEffect(() => {
    if (!pc) return;
    pc.ontrack = ({ track, streams }) => {
      track.onunmute = () => {
        if (!audioRef.current) return;
        if (audioRef.current.srcObject) return;
        audioRef.current.srcObject = streams[0];
      };
    };

    pc.onicecandidate = ({ candidate }) => {
      webSocket.send(JSON.stringify({
        iceCandidates: {
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
      // Close all tracks
      pc.getSenders().forEach((sender) => {
        if (sender.track) {
          sender.track.stop();
        }
      });

      // Close the connection
      pc.close();

      // Reset all refs
      makingOfferRef.current = false;
      ignoreOfferRef.current = false;
      politeRef.current = false;
      iceCandidatesQueue.current = [];

      // Reset the state
      setPc(undefined);
    }
  }, [pc]);
}
