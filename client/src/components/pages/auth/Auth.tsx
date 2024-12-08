import React, { useState } from "react";
import { GoogleButton, LandingLayout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

function Auth(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();

  const url = new URL(`${import.meta.env.VITE_API}google-auth`, location.href);
  url.protocol = url.protocol.replace("http", "ws");
  url.protocol = url.protocol.replace("api", "ws");
  console.log(url.href);

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
          const user = await chrome.cookies.get({
            url: import.meta.env.VITE_HOST,
            name: "user",
          });
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
