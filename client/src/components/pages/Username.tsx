import React, { useState } from "react";
import { LandingLayout } from "../layout/Layout";
import { ArrowRight } from "lucide-react";
import { useCookies } from "react-cookie";

// Define an interface for your user object
interface User {
  username?: string;
  // Add other user properties as needed
}

const UsernameSelection = () => {
  const [username, setUsername] = useState("");

  // Explicitly type the cookies hook
  const [cookies, setCookie] = useCookies<string, { user?: User }>(["user"]);

  const handleSubmit = () => {
    if (username.trim()) {
      // Safely handle user object
      const currentUser: User = cookies.user || {};
      currentUser.username = username;

      // Use setCookie with explicit typing
      setCookie("user", currentUser, { path: "/" });

      setUsername("");

      // Close tab logic
      if (chrome?.tabs) {
        chrome.tabs.getCurrent((tab) => {
          if (tab && tab.id) {
            chrome.tabs.remove(tab.id);
          }
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username.trim()) {
      handleSubmit();
    }
  };

  return (
    <LandingLayout text="Choose Username">
      <div className="relative flex items-center">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
          className="relative w-full h-[3.25rem] w-53 px-5 py-3 bg-slate-900 rounded-lg
                      text-white placeholder-gray-400 text-sm
                      border border-white/10 
                      focus:border-violet-500/50
                      focus:outline-none focus:ring-2 focus:ring-violet-500/20
                      transition-all duration-300
                      pr-12"
          placeholder="Username"
        />
        <button
          onClick={handleSubmit}
          disabled={!username.trim()}
          className={`absolute right-2 p-2 rounded-md
                        transition-all duration-300
                        ${
                          username.trim()
                            ? "text-violet-400 hover:text-violet-300 hover:bg-white/5"
                            : "text-gray-600 cursor-not-allowed"
                        }`}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </LandingLayout>
  );
};

export default UsernameSelection;
