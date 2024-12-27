import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "StreamBot",
      message: "Welcome to the stream! 👋",
    },
    { id: 2, user: "Viewer123", message: "Hey everyone!" },
  ]);

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
