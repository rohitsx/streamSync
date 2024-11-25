import React, { useState } from "react";
import { LandingLayout } from "./Layout";
import { ArrowRight } from "lucide-react";

const UsernameSelection = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      setUsername("");
      console.log("Username submitted:", username);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username.trim()) {
      handleSubmit();
    }
  };

  return (
    <LandingLayout text="Choose Username">
      <div className="relative  flex items-center">
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
