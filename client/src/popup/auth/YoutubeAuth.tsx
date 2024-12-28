import Layout, { YouTubeButton } from "@/layout/Layout";
import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQSection from "./YoutubeAuthFAQ";
import { ArrowLeft } from "lucide-react";
import useChromeCookies from "@/hook/useChromeCookies";

export default function YoutubeAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const { getCookie } = useChromeCookies();

  const handleGoogleAuth = async (): Promise<void> => {
    const user = await getCookie({ name: "user" });
    if (!user) return;

    const { status } = await chrome.runtime.sendMessage(
      {
        action: "youtubeAuth",
        userId: JSON.parse(user.value).id,
      },
    );

    console.log(status);
    status ? nav("/close") : console.error("error");
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

        <div className="space-y-3">
          <YouTubeButton onClick={handelClick} isLoading={isLoading} />

          <FAQSection />
        </div>
      </div>
    </Layout>
  );
}
