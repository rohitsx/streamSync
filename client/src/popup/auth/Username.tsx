import React, { useState } from "react";
import { LandingLayout } from "@/layout/Layout";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useChromeCookies from "@/hook/useChromeCookies"

const UsernameSelection = () => {
  const [username, setUsername] = useState("");
  const nav = useNavigate();
  const { getCookie, setCookie } = useChromeCookies();

  const handleSubmit = async () => {
    if (username.trim()) {
      const user = await getCookie({ name: "user" });

      if (!user) {
        console.log("no user");
        nav("/");
        return;
      } else {
        const u = JSON.parse(user.value);
        u.username = username;
        await setCookie({ name: "user", value: JSON.stringify(u) });
      }

      const cookies = await getCookie({ name: "sessionToken" });
      if (!cookies) return;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API}set-username`,
          {
            username: username,
            email: "rohitbindsr@gmail.com",
            sessiontoken: JSON.parse(cookies.value),
          },
        );
        res.status === 200 && nav("/close");
      } catch (err) {
        console.log(err);
      }
      setUsername("");
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
