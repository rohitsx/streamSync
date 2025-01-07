import { User } from "lucide-react";

export default function UserLogoCall({ isVisible, status, stranger }: any) {
  const colors = {
    gradient: {
      primary: "from-indigo-500 to-violet-500",
      ring1: "border-indigo-400/30",
      ring2: "border-violet-400/20",
    },
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div
        className={`relative ${
          isVisible ? "scale-100" : "scale-95"
        } transition-all duration-700 ease-out`}
      >
        <div
          className={`w-48 h-48 rounded-full bg-gradient-to-tr ${colors.gradient.primary} p-1`}
        >
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
            <User className="w-24 h-24 text-gray-200" />
          </div>
        </div>
        {status === "ringing" && (
          <>
            <div
              className={`absolute inset-0 -m-2 rounded-full border-2 ${colors.gradient.ring1} animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]`}
            />
            <div
              className={`absolute inset-0 -m-4 rounded-full border-2 ${colors.gradient.ring2} animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]`}
            />
          </>
        )}
        <h2 className="mt-6 text-4xl font-bold text-white text-center">
          {stranger}
        </h2>
      </div>
    </div>
  );
}
