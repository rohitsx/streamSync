import { MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-blue-900/30">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-blue-400" />
        <h1 className="text-xl font-medium text-slate-200">
          StreamSync Live Chat
        </h1>
      </div>
    </div>
  );
}
