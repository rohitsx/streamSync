import { ReactNode } from "react";

export function ContentBackground({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center w-96 h-96">
      <div className="text-xl w-full h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}
