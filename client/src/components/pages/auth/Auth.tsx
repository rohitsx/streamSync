import React, { useState } from "react";
import { GoogleButton, LandingLayout } from "@/components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/api";
import { useCookies } from "react-cookie";

function Auth(): React.JSX.Element {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCookies] = useCookies(["sessionToken", "user"]);

  const handleResponse = ({ token, user }: { token: string; user: User }) => {
    setCookies("sessionToken", token, { path: "/" });
    setCookies("user", user, { path: "/" });
    user.username ? nav("/") : nav("/username");
  };

  const handleGoogleSignup = async (): Promise<void> => {
    setIsLoading(true);
    chrome.runtime.sendMessage(
      {
        action: "googleLogin",
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      },
      async ({ accessToken }) => {
        await axios
          .post(`${import.meta.env.VITE_API}google-auth`, accessToken)
          .then((res) => handleResponse(res.data))
          .catch((err) => console.log("LandingPage", err));
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
