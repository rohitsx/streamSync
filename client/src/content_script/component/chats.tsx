import { MessageProp } from "@/types/api";
import { useEffect, useState } from "react";

export default function Chat({ webSocket }: { webSocket: WebSocket }) {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  useEffect(() => {
    webSocket.onmessage = (ev) => {
      const { liveMessage } = JSON.parse(ev.data);
      console.log(liveMessage);
      liveMessage && setMessages((prev) => [...prev, liveMessage]);
    };
  }, [webSocket]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="group hover:bg-gray-800/50 rounded-lg p-3 transition-colors duration-200"
        >
          <div className="flex items-start space-x-2">
            <span className="text-2xl text-blue-400 font-semibold">
              {msg.user}
            </span>
            <p className="text-2xl text-gray-100">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
