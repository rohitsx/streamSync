import Chat from "./chats";
import ChatInput from "./chatInput";
import { useEffect, useState } from "react";
import LoginPrompt from "./loginPromt";
import Header from "./header";
import Call from "@/components/call/Call";
import useWebSocket from "@/hook/useWebSocket";

export default function ChatBox() {
  const [checkUser, setCheckUser] = useState<boolean>(false);

  const webSocket = useWebSocket();
  const [stranger, setStranger] = useState<string | undefined>();

  useEffect(() => {
    try {
      const handleMessage = async (ev: MessageEvent) => {
        const { startCall } = JSON.parse(ev.data);
        if (!startCall) return;
        setStranger(startCall.hostName);
      };

      webSocket?.addEventListener("message", handleMessage);
      return () => {
        webSocket?.removeEventListener("message", handleMessage);
      };
    } catch (e) {
      console.log(e);
    }
  }, [webSocket]);

  useEffect(() => {
    (async () => {
      const username = await chrome.runtime.sendMessage({
        action: "getUsername",
      });
      if (username === "user not found") return;
      username && setCheckUser(true);
    })();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      {webSocket
        ? (
          <>
            <Chat webSocket={webSocket} />
            {checkUser ? <ChatInput webSocket={webSocket} /> : <LoginPrompt />}
          </>
        )
        : <div>Connecting to server...</div>}

      {webSocket && stranger && (
        <Call
          stranger={stranger}
          webSocket={webSocket}
          setStranger={setStranger}
          userType={"audience"}
        />
      )}
    </div>
  );
}
