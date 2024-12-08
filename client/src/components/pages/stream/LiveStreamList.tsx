import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import { ytThumbnail } from "@/types/api";
import useChromeCookies from "@/hook/useChromeCookies";
import {
  GoBackBtn,
  LoadingLayout,
  UnActiveLive,
} from "@/components/layout/LiveSteamLayout";

export default function LiveStream() {
  const [ytThumbnail, setYtThumbnail] = useState<ytThumbnail | "Not Live">();
  const [isLoading, setIsLoading] = useState(true);
  const { getCookie } = useChromeCookies();
  const [streamId, setStreamId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const getYtStream = useCallback(async () => {
    try {
      setIsLoading(true);
      const user = await getCookie({ name: "user" });
      if (!user) return;
      const id = JSON.parse(user.value).id;

      const response = await axios.get(
        `${import.meta.env.VITE_API}get-yt-stream`,
        {
          params: { id },
        },
      );

      const { accessToken, liveStreamData } = response.data;
      const data = liveStreamData.items[0];
      setStreamId(data.id);
      setAccessToken(accessToken);

      const thumbnail = data.snippet.thumbnails.high;
      const title = data.snippet.title;
      thumbnail
        ? setYtThumbnail({ thumbnail, title })
        : setYtThumbnail("Not Live");
    } catch (error) {
      console.error("Error fetching YouTube stream:", error);
      setYtThumbnail("Not Live");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getYtStream();
  }, [getYtStream]);

  const handleStreamClick = useCallback(() => {
    if (ytThumbnail !== "Not Live" && ytThumbnail?.thumbnail && streamId) {
      window.open(
        `index.html#/chat/${streamId}/${accessToken}`,
        "newwin",
        "width=200px",
      );
    }
  }, [ytThumbnail, streamId, accessToken]);

  return (
    <Layout>
      <div className="w-full px-2 space-y-3">
        <GoBackBtn value={"Select Live Stream"} />

        {isLoading ? (
          <LoadingLayout />
        ) : ytThumbnail !== "Not Live" && ytThumbnail?.thumbnail ? (
          <div
            onClick={handleStreamClick}
            className="group cursor-pointer transition-all duration-300 ease-in-out"
          >
            <div className="w-full bg-slate-800/60 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 p-0 overflow-hidden">
              <div className="relative w-full">
                <img
                  src={ytThumbnail?.thumbnail.url}
                  alt="YouTube Stream Thumbnail"
                  className="w-full h-40 object-cover transition-transform duration-300 
                    group-hover:scale-105 group-active:scale-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-white truncate pr-1">
                      {ytThumbnail?.title}
                    </h2>
                    <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <UnActiveLive />
        )}
      </div>
    </Layout>
  );
}
