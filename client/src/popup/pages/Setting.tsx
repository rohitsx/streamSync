import { Check, LogOut } from "lucide-react";
import Layout from "@/layout/Layout";
import useDeleteToken from "@/hook/useDeleteToken";
import { useState } from "react";

export default function Setting() {
  const deleteToken = useDeleteToken();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    deleteToken();
    setIsLoggingOut(false);
    setLogoutComplete(true);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut || logoutComplete}
          className={`w-full flex items-center justify-between px-4 py-3 
            rounded-xl backdrop-blur-md transition-all duration-300 ease-in-out 
            hover:scale-[1.02] active:scale-[0.98] group
            border border-white/10 hover:border-white/20
            ${
            logoutComplete
              ? "bg-green-900/60 cursor-default"
              : isLoggingOut
              ? "bg-slate-800/60 cursor-wait"
              : "bg-red-900/60"
          } text-white`}
        >
          <div className="flex items-center space-x-3">
            {logoutComplete
              ? <Check className="text-green-400" size={24} />
              : (
                <LogOut
                  className={`${
                    isLoggingOut ? "text-slate-400" : "text-red-400"
                  }`}
                  size={24}
                />
              )}
            <span className="font-medium text-base">
              {logoutComplete
                ? "Logout Complete"
                : isLoggingOut
                ? "Logging out..."
                : "Logout"}
            </span>
          </div>
          {!logoutComplete && (
            <div
              className={`text-white/60 group-hover:translate-x-1 transition-transform ${
                isLoggingOut ? "opacity-0" : ""
              }`}
            >
              →
            </div>
          )}
        </button>
      </div>
    </Layout>
  );
}
