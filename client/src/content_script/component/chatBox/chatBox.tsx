import Chat from "./chats";
import ChatInput from "./chatInput";
import { useEffect, useState } from "react";
import LoginPrompt from "./loginPromt";
import Header from "../header";

export default function ChatBox(
  { webSocket }: { webSocket: WebSocket | null },
) {
  const [checkUser, setCheckUser] = useState<boolean>(false);

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
    </div>
  );
}
