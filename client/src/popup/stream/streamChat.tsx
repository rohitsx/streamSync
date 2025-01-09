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
      <div className="flex-1 overflow-y-auto rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 shadow-xl">
        <div className="p-4 space-y-2">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              onClick={() => startCall(msg.user)}
              className="group hover:bg-slate-800/50 rounded-lg p-3 transition-all duration-300 
                       border border-slate-700/50 hover:border-slate-600/50 
                       shadow-sm hover:shadow-md cursor-pointer backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 
                            flex items-center justify-center text-white font-medium">
                  {msg.user[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-white">
                    {msg.user}
                  </span><p className="text-sm text-slate-300 mt-1">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
