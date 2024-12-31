import env from "@/config/enviroment";
import { useCallback, useEffect, useState } from "react";

const useWebSocket = () => {
  const [wsRef, setWsRef] = useState<WebSocket | null>(null);

  const connectWs = useCallback(() => {
    const initializeWebSocket = async () => {
      const currentUrl = window.location.href;
      const streamId = new URL(currentUrl).searchParams.get("v");
      const username = await chrome.runtime.sendMessage({
        action: "getUsername",
      });

      const url =
        `${env.wsApi}join-room?streamId=${streamId}&username=${username}`;
      setWsRef(new WebSocket(url));
    };

    initializeWebSocket();
  }, []);

  const handleWs = useCallback(() => {
    if (!wsRef) return;
    wsRef.onopen = () => console.log("WebSocket connected");
    wsRef.onclose = () => console.log("WebSocket disconnected");
    wsRef.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      wsRef.close();
      setWsRef(null);
    };
  }, [wsRef]);

  useEffect(connectWs, []);
  useEffect(handleWs, [wsRef]);
  return wsRef;
};

export default useWebSocket;
