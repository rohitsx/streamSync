import React, { useState } from "react";
import Layout, { LayoutLogo } from "./Layout";
import { ArrowRight } from "lucide-react";

const UsernameSelection = () => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (username.trim()) {
      console.log("Username submitted:", username);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && username.trim()) {
      handleSubmit();
    }
  };

  return (
    <Layout>
      <LayoutLogo text="Elevate Your Stream Experience" />
      <div className="w-full flex flex-col max-w-xs p-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-gradient-to-br from-slate-900 to-slate-950">
              Choose Username
            </span>
          </div>
        </div>
        <div className="relative group">
          <div 
            className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-20 transition duration-300 ${
              isFocused ? "opacity-30" : ""
            }`}
          />
          <div className="relative flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              className="relative w-full px-4 py-3 bg-slate-900 rounded-lg
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
                        ${username.trim() 
                          ? 'text-violet-400 hover:text-violet-300 hover:bg-white/5' 
                          : 'text-gray-600 cursor-not-allowed'
                        }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsernameSelection;
