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

  return (
    <div>
      {username} Connected

      {/* Remote Audio */}
      <audio ref={audioRef} autoPlay controls />
    </div>
  );
}
