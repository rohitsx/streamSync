import Logo from "@/assets/logo";
import Layout, { YouTubeButton } from "@/components/layout/Layout";
import axios from "axios";
import { useState } from "react";

export default function YoutubeAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleAuth = async (): Promise<void> => {
    chrome.runtime.sendMessage(
      { action: "youtubeAuth", clientId: import.meta.env.VITE_CLIENT_ID },
      async ({ accessToken }) => {
        await axios
          .post(`${import.meta.env.VITE_API}youtube-auth`, accessToken)
          .then((res) => {
            console.log(res);
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
