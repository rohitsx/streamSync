import React, { useState } from "react";
import { GoogleButton, LandingLayout } from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/api";
import { useCookies } from "react-cookie";

function Auth(): React.JSX.Element {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCookies] = useCookies(["token", "user"], {
    doNotParse: true,
  });

  const createCookie = ({ token, user }: { token: string; user: User }) => {
    setCookies("token", token);
    setCookies("user", user);
  };

  const handleGoogleSignup = async (): Promise<void> => {
    setIsLoading(true);
    chrome.runtime.sendMessage(
      { action: "googleLogin" },
      async ({ accessToken }) => {
        await axios
          .post(`${import.meta.env.VITE_API}google-auth`, accessToken)
          .then((res) => {
            createCookie(res.data);
            res.data.username ? nav("/") : nav("/username");
          })
          .catch((err) => {
            console.log("LandingPage", err);
          });
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
