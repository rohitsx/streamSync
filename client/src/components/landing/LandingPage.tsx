import React, { useState } from "react";
import Layout, { LayoutLogo, GoogleButton } from "./Layout";

function LandingPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleSignup = async (): Promise<void> => {
    setIsLoading(true);
    chrome.runtime.sendMessage({ action: "googleLogin" }, ({ user }) => {
      console.log(user);
    });
  };

  return (
    <Layout>
      <LayoutLogo text="Elevate Your Stream Experience" />
      <div className="w-full flex flex-col max-w-xs p-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-gradient-to-br from-slate-900 to-slate-950">
              Continue With
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <GoogleButton onClick={handleGoogleSignup} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;
