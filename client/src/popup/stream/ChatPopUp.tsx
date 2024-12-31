import { MessageProp } from "@/types/api";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Call from "./Call";

export default function ChatPopUp() {
  const params = useParams();
  const [callUsername, setCallUsername] = useState<string | undefined>();
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

  const isNewTab = useMemo(() => {
    const popup = window.innerWidth <= 380 && window.innerHeight <= 600;
    return !popup;
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
        {
          "flex items-center justify-center bg-[length:400%_400%] animate-gradient":
            isNewTab,
        },
      )}
    >
      {/* Main container with fixed header */}
      <div className="w-full max-w-4xl flex flex-col h-screen">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 p-4 rounded-t-lg shadow-lg">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            StreamSyn
          </h1>
        </div>
        <Call username={callUsername} webSocket={webSocket} />

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-gray-900 p-2 space-y-2">
          {messages?.map((msg) => (
            <div
              onClick={() => setCallUsername(msg.user)}
              key={msg.id}
              className="group hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-300 ease-in-out border border-transparent hover:border-gray-700 shadow-sm hover:shadow-md"
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
      </div>
    </div>
  );
}
