import { useEffect, useRef } from "react";

export default function Call(
  { username, webSocket }: {
    username: string | undefined;
    webSocket: WebSocket;
  },
) {
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const config = {
      iceServers: [{ urls: "stun:stun.my-stun-server.tld" }],
    };
    const pc = new RTCPeerConnection(config);
    const constraints = { audio: true };
    let makingOffer = false;
    let ignoreOffer = false;

    pc.onnegotiationneeded = async () => {
      try {
        makingOffer = true;
        await pc.setLocalDescription();
        webSocket.send(
          JSON.stringify({ description: pc.localDescription, to: username }),
        );
      } catch (err) {
        console.error(err);
      } finally {
        makingOffer = false;
      }
    };

    pc.onicecandidate = ({ candidate }) =>
      webSocket.send(JSON.stringify({ candidate, to: username }));

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        for (const track of stream.getTracks()) {
          pc.addTrack(track, stream);
        }

        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
          localAudioRef.current.play().catch((error) => {
            console.error("Audio playback failed:", error);
          });
        }

        pc.ontrack = ({ track, streams }) => {
          track.onunmute = () => {
            if (remoteAudioRef.current && !remoteAudioRef.current.srcObject) {
              remoteAudioRef.current.srcObject = streams[0];
              remoteAudioRef.current.play().catch((error) => {
                console.error("Remote audio playback failed:", error);
              });
            }
          };
        };
      } catch (error) {
        console.error("Error accessing user media:", error);
      }
    })();

    return () => {
      pc.close();
    };
  }, []);

  return (
    <div>
      {username} Connected
      <audio ref={localAudioRef} autoPlay controls />

      {/* Remote Audio */}
      <audio ref={remoteAudioRef} autoPlay controls />
    </div>
  );
}
