import { MessageProp } from "@/types/api";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatPopupProp {
  startCall: (calleeUsername: string) => void;
  webSocket: WebSocket;
}

export default function StreamChat({ startCall, webSocket }: ChatPopupProp) {
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [messageId, setMessagesId] = useState(0);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-h-[calc(100vh-150px)] overflow-y-auto px-4 md:px-6 py-6 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="group relative flex gap-3 p-4 rounded-2xl max-w-4xl mx-auto border border-transparent hover:border-blue-500/20 bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/5"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-950 flex items-center justify-center text-blue-200 font-medium border border-blue-800/30 shadow-inner shadow-blue-900/20">
              {msg.user[0].toUpperCase()}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="mt-2 text-slate-300 text-sm">
              <span className="opacity-70 font-medium text-zinc-300 truncate">
                {msg.user + "   "}
              </span>
              {msg.message}
            </p>
          </div>

          <button
            onClick={() => startCall(msg.user)}
            className="w-10 h-10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 bg-blue-950 hover:bg-blue-900 transition-all duration-300 transform hover:scale-110 border border-blue-800/30 shadow-lg shadow-blue-900/20"
          >
            <Phone className="w-4 h-4 text-blue-300" />
          </button>
        </div>
      ))}
      <div ref={messagesEndRef} />
      {" "}
    </div>
  );
}
