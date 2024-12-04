import Layout, { YouTubeButton } from "@/components/layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQSection from "./YoutubeAuthFAQ";
import { ArrowLeft } from "lucide-react";

export default function YoutubeAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();

  const handleGoogleAuth = async (): Promise<void> => {
    const user = await chrome.cookies.get({
      url: import.meta.env.VITE_HOST,
      name: "user",
    });
    user &&
      chrome.runtime.sendMessage({
        action: "youtubeAuth",
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        api: import.meta.env.VITE_API + "youtube-auth",
        id: JSON.parse(user.value).id,
      });
  };

  const handelClick = async (): Promise<void> => {
    setIsLoading(true);
    handleGoogleAuth().catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className="w-full space-y-6">
        <button
          onClick={() => nav(-1)}
          className="group flex items-center text-white/60 hover:text-white transition-colors text-xs mb-2"
        >
          <ArrowLeft
            size={16}
            className="mr-2 group-hover:translate-x-[-2px] transition-transform"
          />
          Back
        </button>

        <div className="space-y-6">
          <YouTubeButton onClick={handelClick} isLoading={isLoading} />

          <FAQSection />
        </div>
      </div>
    </Layout>
  );
}
