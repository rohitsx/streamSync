import Logo from "@/assets/logo";
import Layout, { YouTubeButton } from "@/components/layout/Layout";
import axios from "axios";
import { useState } from "react";

export default function StartStream() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleGoogleSignup = async (): Promise<void> => {
    setIsLoading(true);
    chrome.runtime.sendMessage(
      { action: "youtube-auth" },
      async ({ accessToken }) => {
        await axios
          .post(`${import.meta.env.VITE_API}youtube-auth`, accessToken)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("StartStream", err);
          });
      },
    );
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-2 ">
        <Logo />
        <YouTubeButton onClick={handleGoogleSignup} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
