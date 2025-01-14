import Chat from "./chats";
import ChatInput from "./chatInput";
import { useEffect, useState } from "react";
import LoginPrompt from "./loginPromt";
import Header from "./header";
import Call from "@/components/call/Call";
import useWebSocket from "@/hook/useWebSocket";
import EndStream from "./streamEnded";

export default function ChatBox() {
  const [checkUser, setCheckUser] = useState<boolean>(false);

  const webSocket = useWebSocket();
  const [stranger, setStranger] = useState<string | undefined>();
  const [endStream, setEndStream] = useState<boolean>(false);

  useEffect(() => {
    try {
      const handleMessage = async (ev: MessageEvent) => {
        const { startCall, streamStatus } = JSON.parse(ev.data);
        if (startCall) {
          setStranger(startCall.hostName);
          const video = document.querySelector("video");
          video && (video.muted = true);
        }
        if (streamStatus) setEndStream(true);
        else return;
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
    <div className="w-full h-full flex flex-col bg-slate-950">
      <Header />
      {!webSocket
        ? (
          <div className="flex text-2xl items-center justify-center h-64 text-slate-400">
            Connecting to server...
          </div>
        )
        : (
          <>
            <Chat webSocket={webSocket} />
            {checkUser ? <ChatInput webSocket={webSocket} /> : <LoginPrompt />}
            {stranger && (
              <Call
                stranger={stranger}
                webSocket={webSocket}
                setStranger={setStranger}
                userType="audience"
              />
            )}
            {endStream && <EndStream />}
          </>
        )}
    </div>
  );
}
