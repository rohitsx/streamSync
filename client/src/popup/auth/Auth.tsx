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
    const res = await chrome.runtime.sendMessage(
      {
        action: "googleLogin",
      },
    );
    res && handlerResponse(res);

    async function handlerResponse({ status }: { status: string }) {
      setIsLoading(false);
      if (status !== "success") return console.log("error loging up");
      const user = await getCookie({ name: "user" });
      user && JSON.parse(user.value).username
        ? nav("/close")
        : nav("/username");
    }
  };

  return (
    <LandingLayout text="Continue With">
      <GoogleButton onClick={handleGoogleSignup} isLoading={isLoading} />
    </LandingLayout>
  );
}

export default Auth;
