import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "StreamBot",
      message: "Welcome to the stream! 👋",
    },
    { id: 2, user: "Viewer123", message: "Hey everyone!" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          message: input,
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="h-101  ">
      <div className="max-w-4xl mx-auto h-100 rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 bg-gray-850 shadow-xl overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-900/50 p-6 border-b border-gray-700">
            <h1 className="text-2xl  text-white">
              StreamSync Chat
            </h1>
          </div>

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

          <div className="p-4 bg-gray-900/50 border-t border-gray-700">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-gray-800 text-2xl text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="p-3 rounded-full hover:bg-gray-700 text-blue-400 transition-colors duration-200"
              >
                <SendHorizontal className="w-7 " />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
