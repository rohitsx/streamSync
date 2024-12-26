import React, { useState } from "react";
import { GoogleButton, LandingLayout } from "@/layout/Layout";
import { useNavigate } from "react-router-dom";
import useChromeCookies from "@/hook/useChromeCookies";

function Auth(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const { getCookie } = useChromeCookies();

  const handleGoogleSignup = async (): Promise<void> => {
    setIsLoading(true);
    chrome.runtime.sendMessage(
      {
        action: "googleLogin",
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        host: import.meta.env.VITE_HOST,
        api: import.meta.env.VITE_API + "google-auth",
      },
      async ({ status }: { status: string }) => {
        setIsLoading(false);
        if (status === "success") {
          const user = await getCookie({ name: "user" });
          user && JSON.parse(user.value).username
            ? nav("/close")
            : nav("/username");
        } else console.log("error loging up");
      },
    );
  };

  return (
    <LandingLayout text="Continue With">
      <GoogleButton onClick={handleGoogleSignup} isLoading={isLoading} />
    </LandingLayout>
  );
}

export default Auth;
