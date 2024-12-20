import { Background } from "@/layout/Layout";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function ChatPopUp() {
  const params = useParams();

  const ws = useMemo(() => {
    const url = `${import.meta.env.VITE_WS}create-room?streamid=${params.streamId}&accestoken=${params.token}&username=${params.username}`;
    return new WebSocket(url);
  }, []);

  useEffect(() => {
    ws.onopen = () => {
      ws.send("Hii");
    };
  }, [ws]);

  useEffect(() => {
    const deleteRoom = () => {
      ws.close();
      axios.post(`${import.meta.env.VITE_API}delete-room`, {
        username: params.username,
      });
    };

    onbeforeunload = deleteRoom;
    return () => {
      deleteRoom();
    };
  });

  return (
    <Background>
      <div>ChatPopUp</div>
    </Background>
  );
}
