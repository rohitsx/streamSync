import { Background } from "@/layout/Layout";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function ChatPopUp() {
  const params = useParams();

  const ws = useMemo(() => {
    const url =
      `${import.meta.env.VITE_WS}create-room?streamid=${params.streamId}&accestoken=${params.token}&username=${params.username}`;
    return new WebSocket(url);
  }, []);

  useEffect(() => {
    ws.onopen = () => {};
  }, [ws]);

  return (
    <Background>
      <div>ChatPopUp</div>
    </Background>
  );
}
