import { MessageProp } from "@/types/api";
import { useEffect, useState } from "react";

interface ChatPopupProp {
  startCall: (calleeUsername: string) => void;
  webSocket: WebSocket;
}

export default function StreamChat({ startCall, webSocket }: ChatPopupProp) {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [messageId, setMessagesId] = useState(0);

  useEffect(() => {
    const handleMessage = (ev: MessageEvent) => {
      const { liveMessage } = JSON.parse(ev.data);
      if (!liveMessage) return;
      setMessagesId((prev) => prev + 1);
      setMessages((prev) => [...prev, { ...liveMessage, id: messageId }]);
    };
    webSocket.addEventListener("message", handleMessage);
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [webSocket, messageId]);

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
