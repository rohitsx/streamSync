import { SendHorizonal } from "lucide-react";
import { useState } from "react";

export default function ChatInput() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // List of all YouTube shortcuts
    const youtubeShortcuts = [
      'k',      // Play/Pause
      'j',      // Rewind 10 seconds
      'l',      // Forward 10 seconds
      'm',      // Mute
      ',',      // Previous frame while paused
      '.',      // Next frame while paused
      '<',      // Decrease playback speed
      '>',      // Increase playback speed
      'f',      // Toggle full screen
      't',      // Theater mode
      'i',      // Mini player
      '/',      // Focus on search
      '?',      // Open keyboard shortcuts panel
      'c',      // Toggle closed captions
      'shift+n', // Next video
      'shift+p', // Previous video
      '0',      // Seek to beginning
      '1',      // Seek to 10%
      '2',      // Seek to 20%
      '3',      // Seek to 30%
      '4',      // Seek to 40%
      '5',      // Seek to 50%
      '6',      // Seek to 60%
      '7',      // Seek to 70%
      '8',      // Seek to 80%
      '9',      // Seek to 90%
      'home',   // Seek to beginning
      'end',    // Seek to end
      'space',  // Play/Pause
      'up',     // Increase volume
      'down',   // Decrease volume
      'left',   // Rewind 5 seconds
      'right'   // Forward 5 seconds
    ];

    // If Ctrl or Cmd is pressed
    if (e.ctrlKey || e.metaKey) {
      // Allow only copy, paste, cut, and select all
      const allowedKeys = ['c', 'v', 'x', 'a', 'backspace'];
      if (!allowedKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    
    // For all YouTube shortcuts (including number keys)
    const keyToCheck = e.shiftKey ? `shift+${e.key.toLowerCase()}` : e.key.toLowerCase();
    if (youtubeShortcuts.includes(keyToCheck)) {
      e.stopPropagation();
      // Don't prevent default for navigation keys (arrow keys) when editing text
      if (!['left', 'right', 'home', 'end'].includes(keyToCheck)) {
        e.preventDefault();
      }
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
