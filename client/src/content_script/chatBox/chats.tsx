import { MessageProp } from "@/types/api";
import { useEffect, useRef, useState } from "react";

export default function Chat({ webSocket }: { webSocket: WebSocket }) {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [messageId, setMessagesId] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }, [webSocket, messageId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="h-full overflow-y-auto px-2 md:px-2 py-6 space-y-2"
      ref={chatContainerRef}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="group relative flex gap-4 p-4 rounded-3xl max-w-4xl mx-auto"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center text-blue-200">
            {msg.user[0].toUpperCase()}
          </div>
          <p className="mt-0 text-slate-300 text-2xl">
            {/* Removed the extra wrapper div and adjusted margin */}
            <span className="opacity-70 font-medium text-zinc-300 truncate">
              {msg.user + "   "}
            </span>
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
}
