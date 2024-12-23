import { useState } from "react";
import { Send, Settings } from "lucide-react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "StreamBot",
      message: "Welcome to the stream! 👋",
      timestamp: "12:00",
    },
    { id: 2, user: "Viewer123", message: "Hey everyone!", timestamp: "12:01" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          message: input,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col ">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <h1 className="text-gray-100 font-bold text-xl">Stream Chat</h1>
        <Settings className="w-6 h-6 text-gray-400 hover:text-gray-200 cursor-pointer" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in">
            <div className="flex items-start space-x-2">
              <span className="text-indigo-400 font-medium text-sm">
                {msg.user}
              </span>
              <span className="text-gray-400 text-xs mt-0.5">
                {msg.timestamp}
              </span>
            </div>
            <p className="text-gray-200 text-base ml-1">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-700 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
