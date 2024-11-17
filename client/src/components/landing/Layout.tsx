import Logo from "@/assets/logo";
import { ReactNode, useMemo } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const isNewTab = useMemo(() => {
    const popup = window.innerWidth <= 380 && window.innerHeight <= 600;
    return !popup;
  }, []);

  return (
    <div
      className={`${
        isNewTab &&
        "min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-slate-900 to-slate-950 text-white flex flex-col items-center justify-between p-6 ${
          isNewTab ? "w-[480px] h-[600px]" : "w-[380px] h-[500px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <div className="max-w-md w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-filter backdrop-blur-xl rounded-xl shadow-2xl shadow-indigo-500/10 p-5 space-y-5 border border-indigo-500/20">
        {children}
      </div>
    </Layout>
  );
}

export function LayoutLogo({ text }: { text: string }) {
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <Logo />
      <h2 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
        {text}
      </h2>
    </div>
  );
}

export function Btn({
  text,
  worker,
  sBtn,
}: {
  text: string;
  worker: () => void;
  sBtn?: boolean;
}) {
  const handelClick = () => worker();
  const primaryBtn = () => {
    return (
      <button
        onClick={handelClick}
        className="text-sm py-2 px-4 bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold rounded-lg transition duration-300 text-center"
      >
        {text}
      </button>
    );
  };

  const secondaryBtn = () => {
    return (
      <button
        onClick={handelClick}
        className="text-sm py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 text-center"
      >
        {text}
      </button>
    );
  };

  return sBtn ? secondaryBtn() : primaryBtn();
}
