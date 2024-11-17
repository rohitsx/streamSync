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
        "min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-gray-950"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-purple-950 to-gray-950 text-white flex flex-col items-center justify-between p-6 ${isNewTab ? "w-[480px] h-[600px] " : "w-[380px] h-[500px]"} `}
      >
        {children}
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-5 space-y-5">
        {children}
      </div>
    </Layout>
  );
}
