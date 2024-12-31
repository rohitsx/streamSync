import { Background } from "@/layout/Layout";
import { MessageProp } from "@/types/api";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChatPopUp() {
  const params = useParams();
  const [messages, setMessages] = useState<MessageProp[]>([]);

  const webSocket = useMemo(() => {
    const url =
      `${import.meta.env.VITE_WS}create-room?streamId=${params.streamId}&accessToken=${params.token}&username=${params.username}`;
    return new WebSocket(url);
  }, []);

  useEffect(() => {
    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setMessages((prev) => [...prev, data]);
    };
  }, [webSocket]);

  return (
    <Background>
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
    </Background>
  );
}
