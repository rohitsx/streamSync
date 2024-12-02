import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import { ytThumbnail } from "@/types/api";
import { ExternalLink, Youtube } from "lucide-react";

export default function Host() {
  const [cookies] = useCookies();
  const [ytThumbnail, setYtThumbnail] = useState<ytThumbnail | "Not Live">();
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="w-full px-3 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-700 pb-2">
          <Youtube className="text-red-500" size={28} />
          <h1 className="text-base font-bold text-slate-100 tracking-tight">
            Current Live Stream
          </h1>
        </div>

        {isLoading ? (
          <div className="bg-slate-800/50 rounded-xl overflow-hidden">
            <div className="animate-pulse">
              <div className="h-44 bg-slate-700/50 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-3 bg-slate-700/50 rounded w-3/4"></div>
                <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ) : ytThumbnail !== "Not Live" && ytThumbnail?.thumbnail ? (
          <div
            onClick={handleStreamClick}
            className="group cursor-pointer transition-all duration-300 ease-in-out"
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative">
                <img
                  src={ytThumbnail?.thumbnail.url}
                  alt="YouTube Stream Thumbnail"
                  className="w-full h-44 object-cover transition-transform duration-300 
                    group-hover:scale-105 group-active:scale-100"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300"
                >
                  <ExternalLink
                    className="text-white bg-slate-900/60 backdrop-blur-sm 
                      rounded-full p-2 shadow-lg"
                    size={32}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white truncate pr-2">
                    {ytThumbnail?.title}
                  </h2>
                  <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="bg-slate-800/50 rounded-xl overflow-hidden 
            flex items-center justify-center h-44 text-slate-400 text-sm 
            border border-slate-700 border-dashed"
          >
            <div className="flex flex-col items-center space-y-2">
              <Youtube size={32} className="text-slate-500" />
              <p>No Active Stream</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
