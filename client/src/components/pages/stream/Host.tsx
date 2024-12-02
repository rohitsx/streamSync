import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import { Play, ArrowLeft } from "lucide-react";
import { ytThumbnail } from "@/types/api";
import { useNavigate } from "react-router-dom";

export default function Host() {
  const [cookies] = useCookies();
  const [ytThumbnail, setYtThumbnail] = useState<ytThumbnail | "Not Live">();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getYtStream = useCallback(async () => {
    try {
      setIsLoading(true);
      const id = cookies.user.id;
      const response = await axios.get(
        `${import.meta.env.VITE_API}get-yt-stream`,
        {
          params: { id },
        },
      );
      const data = response.data.items[0];
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
  }, [cookies.user.id]);

  useEffect(() => {
    getYtStream();
  }, [getYtStream]);

  const handleStreamClick = () => {
    if (ytThumbnail !== "Not Live" && ytThumbnail?.thumbnail) {
      window.open(
        `https://www.youtube.com/watch?v=${ytThumbnail.title.split(" ")[0]}`,
        "_blank",
      );
    }
  };

  return (
    <Layout>
      <div className="w-full px-2 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-700 pb-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/60 hover:text-white transition-colors text-xs"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          <h1 className="text-sm font-bold text-slate-100 tracking-tight">
            Select Live Stream
          </h1>
        </div>

        {isLoading ? (
          <div className="bg-slate-800/60 rounded-xl overflow-hidden">
            <div className="animate-pulse">
              <div className="h-28 bg-slate-700/50 w-full"></div>
              <div className="p-2 space-y-2">
                <div className="h-2 bg-slate-700/50 rounded w-3/4"></div>
                <div className="h-2 bg-slate-700/50 rounded w-1/2"></div>
              </div>
            </div>
          </div>
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
          <div className="w-full bg-slate-800/60 h-40 rounded-xl backdrop-blur-md border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400">
            <div className="flex flex-col items-center space-y-1 text-center">
              <Play className="text-slate-500 mb-1" size={24} />
              <p className="text-xs">No Active Stream</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
