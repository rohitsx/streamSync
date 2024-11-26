import useCreateTab from "@/hook/useCreateTab";
import { Radio } from "lucide-react";

export default function HostStream() {
  const createTab = useCreateTab();

  return (
    <section>
      <button 
        onClick={() => createTab("host")}
        className={`
          h-[3.25rem] flex items-center justify-center w-full px-5 py-3
          text-sm font-medium transition-all duration-300
          bg-gradient-to-r from-slate-800/90 to-slate-900/90
          border border-white/10 hover:border-white/20
          rounded-lg shadow-xl
          hover:shadow-violet-500/20 hover:from-slate-800 hover:to-slate-900
          focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-slate-900
        `}
      >
        <div className="flex items-center">
          <Radio className="w-5 h-5 mr-3 text-violet-400" />
          <span className="text-gray-200">Host Stream</span>
        </div>
      </button>
    </section>
  );
}
