import { ReactNode } from "react";

export function ContentBackground({ children }: { children: ReactNode }) {
  return (
    <div className="h-100 border border-gray-700 rounded-lg">
      {children}
    </div>
  );
}
