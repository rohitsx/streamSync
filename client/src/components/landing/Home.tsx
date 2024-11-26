import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo";
import Layout from "./Layout";
import { ChevronRight, Settings, Play, LogIn } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const ButtonStyle =
    "w-full flex items-center justify-between px-4 py-3 rounded-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] group border border-white/10 hover:border-white/20";

  const NavButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    bgColor?: string;
  }> = ({ icon, label, onClick, bgColor = "bg-slate-800/60" }) => (
    <button
      onClick={onClick}
      className={`${ButtonStyle} ${bgColor} text-white`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="font-medium text-base">{label}</span>
      </div>
      <ChevronRight
        className="text-white/60 group-hover:translate-x-1 transition-transform"
        size={20}
      />
    </button>
  );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-4 ">
        <Logo />

        <div className="w-full space-y-4">
          <NavButton
            icon={<Play className="text-green-400" size={24} />}
            label="Host Stream"
            onClick={() => navigate("/host")}
            bgColor="bg-slate-800/60"
          />
          <NavButton
            icon={<LogIn className="text-purple-400" size={24} />}
            label="Join Stream"
            onClick={() => navigate("/join")}
            bgColor="bg-purple-900/60"
          />
          <NavButton
            icon={<Settings className="text-blue-400" size={24} />}
            label="Settings"
            onClick={() => navigate("/settings")}
            bgColor="bg-blue-900/60"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
