import { MessageProp } from "@/types/api";
import { useEffect, useState } from "react";

interface ChatPopupMessageProp {
  startCall: (calleeUsername: string) => void;
  webSocket: WebSocket
}

export default function ChatPopupMessage({  startCall, webSocket }: ChatPopupMessageProp) {

  const [messages, setMessages] = useState<MessageProp[]>([]);

  useEffect(() => {
    const handleMessage = (ev: MessageEvent) => {
      const { liveMessage } = JSON.parse(ev.data);
      liveMessage && setMessages((prev) => [...prev, liveMessage]);
    };
    webSocket.addEventListener("message", handleMessage);
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [webSocket]);

  return (
    <>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-2 space-y-2">
        {messages?.map((msg) => (
          <div
            onClick={() => startCall(msg.user)}
            key={msg.id}
            className="group hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-300 ease-in-out border border-transparent hover:border-gray-700 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <span className="text-lg text-indigo-400 font-semibold">
                {msg.user}
              </span>
              <p className="text-lg text-gray-200 font-medium leading-relaxed">
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
