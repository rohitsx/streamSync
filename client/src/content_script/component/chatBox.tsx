import Header from "./header";
import Chat from "./chats";
import ChatInput from "./chatInput";
import useWebSocket from "@/hook/useWebSocket";
import { useEffect, useState } from "react";

export default function ChatBox() {
  const webSocket = useWebSocket();
  const [checkUser, setCheckUser] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const username = await chrome.runtime.sendMessage({
        action: "getUsername",
      });
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
            {checkUser ? <ChatInput webSocket={webSocket} /> : (
              <>
                <div className="p-4 bg-gray-900/50 border-t border-gray-700">
                  Please login to chat
                </div>
              </>
            )}
          </>
        )
        : <div>Connecting to server...</div>}
    </div>
  );
}
