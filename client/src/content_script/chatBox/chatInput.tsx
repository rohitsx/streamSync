import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ webSocket }: { webSocket: WebSocket }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
		console.log("send message")
      webSocket.send(JSON.stringify({ liveMessage: input }));
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const youtubeShortcuts = [
      "k",
      "j",
      "l",
      "m",
      ",",
      ".",
      "<",
      ">",
      "f",
      "t",
      "i",
      "/",
      "?",
      "c",
      "shift+n",
      "shift+p",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "home",
      "end",
      " ",
      "up",
      "down",
      "left",
      "right",
    ];

    // If Ctrl or Cmd is pressed
    if (e.ctrlKey || e.metaKey) {
      // Allow only copy, paste, cut, and select all
      const allowedKeys = ["c", "v", "x", "a", "backspace"];
      if (!allowedKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
      }
      return;
    }

    // Special handling for space key
    if (e.key === " ") {
      e.stopPropagation();
      return;
    }

    // For all other YouTube shortcuts
    const keyToCheck = e.shiftKey
      ? `shift+${e.key.toLowerCase()}`
      : e.key.toLowerCase();
    
    if (youtubeShortcuts.includes(keyToCheck)) {
      e.stopPropagation();
    }
  };

  return (
    <div className="p-4 bg-gray-900/50 border-t border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="w-full bg-gray-800 text-2xl text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 rounded-full hover:bg-gray-700 text-blue-400 transition-colors duration-200"
        >
          <SendHorizonal className="w-7" />
        </button>
      </form>
    </div>
  );
}
