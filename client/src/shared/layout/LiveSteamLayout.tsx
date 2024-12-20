import { ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GoBackBtn = ({ value }: { value: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border-b border-slate-700 pb-1">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white/60 hover:text-white transition-colors text-xs"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
      </button>
      <h1 className="text-sm font-bold text-slate-100 tracking-tight">
        {value}{" "}
      </h1>
    </div>
  );
};

export const LoadingLayout = () => {
  return (
    <div className="bg-slate-800/60 rounded-xl overflow-hidden">
      <div className="animate-pulse">
        <div className="h-28 bg-slate-700/50 w-full"></div>
        <div className="p-2 space-y-2">
          <div className="h-2 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-2 bg-slate-700/50 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export const UnActiveLive = () => {
  return (
    <div className="w-full bg-slate-800/60 h-40 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400">
      <div className="flex flex-col items-center space-y-1 text-center">
        <Play className="text-slate-500 mb-1" size={24} />
        <p className="text-xs">No Active Stream</p>
      </div>
    </div>
  );
};
