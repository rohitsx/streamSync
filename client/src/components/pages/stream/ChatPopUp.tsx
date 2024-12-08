import { Background } from "@/components/layout/Layout";
import axios from "axios";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function ChatPopUp() {
  const params = useParams();

  const ws = useMemo(() => {
    const url = new URL(location.href);
    return new WebSocket(url);
  }, []);

  useEffect(() => {}, []);

  const stareStream = useCallback(() => {
    axios.post(`${import.meta.env.VITE_API}start-stream`, {
      streamId: params.streamId,
      accessToken: params.token,
    });
  }, []);

  useEffect(() => {
    stareStream();
  }, [params.streamId]);

  return (
    <Background>
      <div>ChatPopUp</div>
    </Background>
  );
}
