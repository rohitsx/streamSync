import Logo from "@/assets/logo";
import Layout, { YouTubeButton } from "@/components/layout/Layout";
import { User } from "@/types/api";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function YoutubeAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies();
  const nav = useNavigate();

  const handleGoogleAuth = async (): Promise<void> => {
    chrome.runtime.sendMessage(
      {
        action: "youtubeAuth",
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      },
      async ({ authCode }) => {
        console.log(authCode);
        await axios
          .post(`${import.meta.env.VITE_API}youtube-auth`, {
            email: cookies.user.email,
            authCode,
          })
          .then(() => {
            const currentUser: User = cookies.user;
            currentUser.ytRefreshToken = true;
            setCookies("user", currentUser, { path: "/" });
			nav("/host");
          })
          .catch((err) => {
            console.log("LandingPage", err);
          });
      },
    );
  };

  const handelClick = async (): Promise<void> => {
    setIsLoading(true);
    handleGoogleAuth().catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-2 ">
        <Logo />
        <YouTubeButton onClick={handelClick} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
