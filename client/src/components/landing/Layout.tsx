import Logo from "@/assets/logo";
import { ReactNode, useMemo } from "react";
import clsx from "clsx";
import {
  AuthButtonProps,
  AuthHeadingProps,
  AuthInputProps,
  AuthLayoutProps,
} from "@/types/landing";

export default function Layout({ children }: { children: ReactNode }) {
  const isNewTab = useMemo(() => {
    const popup = window.innerWidth <= 380 && window.innerHeight <= 600;
    return !popup;
  }, []);

  return (
    <div
      className={clsx({
        "min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] bg-[length:400%_400%] animate-gradient after:animate-pulse-slow":
          isNewTab,
      })}
    >
      <div
        className={
          "bg-gradient-to-br from-slate-900/95 to-slate-950/95 text-white flex flex-col items-center justify-between p-6 w-[390px] h-[500px] backdrop-blur-xl shadow-2xl"
        }
      >
        {children}
      </div>
    </div>
  );
}

export function LayoutLogo({ text }: { text: string }) {
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <Logo />
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 tracking-tight">
        {text}
      </h2>
    </div>
  );
}

interface GoogleButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className={`
        flex items-center justify-center w-full px-5 py-3
        text-sm font-medium transition-all duration-300
        bg-gradient-to-r from-slate-800/90 to-slate-900/90
        border border-white/10 hover:border-white/20
        rounded-lg shadow-xl
        hover:shadow-violet-500/20 hover:from-slate-800 hover:to-slate-900
        focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-2 focus:ring-offset-slate-900
        ${isLoading ? "cursor-not-allowed opacity-70" : ""}
      `}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-slate-700 border-t-violet-400 rounded-full animate-spin mr-3" />
          <span className="text-gray-200">Loading...</span>
        </>
      ) : (
        <>
          <div className="bg-white p-1.5 rounded-lg mr-3 shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <span className="text-gray-200">Continue with Google</span>
        </>
      )}
    </button>
  );
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <LayoutLogo text="Elevate Your Stream Experience" />
        </div>
        {children}
      </div>
    </div>
  );
};

export const AuthHeading: React.FC<AuthHeadingProps> = ({ children }) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-semibold text-white">{children}</h2>
    </div>
  );
};

export const AuthInput: React.FC<AuthInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
  placeholder,
  type = "text",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      className="relative w-full px-4 py-3 bg-slate-900 rounded-lg
                text-white placeholder-gray-400 text-sm
                border border-white/10
                focus:border-violet-500/50
                focus:outline-none focus:ring-2 focus:ring-violet-500/20
                transition-all duration-300
                pr-12"
      placeholder={placeholder}
    />
  );
};

export const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  isLoading = false,
  children,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex items-center justify-center px-4 py-3 
                 border border-transparent text-sm font-medium rounded-lg
                 text-white bg-violet-600 hover:bg-violet-700
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-violet-500 ${className}
                 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
