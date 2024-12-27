import { ReactNode } from "react";

export function ContentBackground({ children }: { children: ReactNode }) {
  return (
    <div className="h-101">
      <div className="max-w-4xl mx-auto h-100 rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 bg-gray-850 shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
