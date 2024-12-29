import Header from "./header";
import Chat from "./chats";
import ChatInput from "./chatInput";
import { useCallback, useEffect } from "react";
import env from "@/config/enviroment";

export default function ChatBox() {
  const handleWs = useCallback(() => {
    let ws: WebSocket | undefined;

    (async () => {
      const currectUrl = window.location.href;
      const streamId = new URL(currectUrl).searchParams.get("v");
      const username = await chrome.runtime.sendMessage({
        action: "getUsername",
      });

      const url =
        `${env.wsApi}join-room?streamId=${streamId}&username=${username}`;

      ws = new WebSocket(url);
      console.log(ws);
    })();

    ws && (ws.onopen = () => {
      ws?.send("connected rohit" );
    });
  }, []);
  useEffect(handleWs, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Chat />
      <ChatInput />
    </div>
  );
}
