import useMedia from "@/hook/useMedia";
import { CallProp, WsOnMessageProp } from "@/types/callType";
import { useEffect, useMemo, useRef } from "react";

export default function Call({ username, webSocket }: CallProp) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { getStream, closeStream } = useMedia();
  const pc = useMemo(() =>
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.my-stun-server.tld" }],
    }), []);

  useEffect(() => {
    let stream: MediaStream | null;
    let hostName: string | null;
    (async () => {
      hostName = await chrome.runtime.sendMessage({
        action: "getUsername",
      });
      stream = await getStream();
    })();

    pc.onnegotiationneeded = async () => {
      await pc.setLocalDescription();
      const offer = {
        host: hostName,
        stranger: username,
        description: pc.localDescription,
      };
      webSocket.send(JSON.stringify({ offer }));
    };

    pc.onicecandidate = ({ candidate }) =>
      webSocket.send(JSON.stringify({
        candidate: {
          host: hostName,
          stranger: username,
          description: candidate,
        },
      }));

    pc.ontrack = ({ track, streams }) => {
      track.onunmute = () => {
        audioRef.current && (audioRef.current.srcObject = streams[0]);
      };
    };

    return () => {
      stream && closeStream(stream);
    };
  }, [username]);

  useEffect(() => {
    webSocket.onmessage = (e) => {
      const { offer, answer, iceCandidate }: WsOnMessageProp = JSON.parse(
        e.data,
      );
      console.log({ answer, iceCandidate });
      (async () => {
        if (offer) {
          await pc.setLocalDescription(answer.description);
          webSocket.send(
            JSON.stringify({
              answer: {
                host: offer.host,
                stranger: offer.stranger,
                description: pc.localDescription,
              },
            }),
          );
        }

        if (iceCandidate) await pc.addIceCandidate(iceCandidate.description);
        if (answer) await pc.setRemoteDescription(offer.description);
      })();
    };
  }, []);

  return (
    <div>
      {username} Connected

      {/* Remote Audio */}
      <audio ref={audioRef} autoPlay controls />
    </div>
  );
}
