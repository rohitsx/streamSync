import Layout from "@/components/layout/Layout";
import { ytThumbnail } from "@/types/api";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Host() {
  const [cookies] = useCookies();
  const [ytThumbnail, setYtThumbnail] = useState<ytThumbnail>();

  const getYtStream = useCallback(async () => {
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
    setYtThumbnail({ thumbnail, title });
  }, []);

  useEffect(() => {
    getYtStream();
  }, []);

  return (
    <Layout>
      {ytThumbnail?.thumbnail.url ? (
        <div className="flex flex-col items-center justify-center space-y-4 text-white">
          <img src={ytThumbnail?.thumbnail.url} />
          <div>{ytThumbnail?.title}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 text-white">
          looking for stream
        </div>
      )}
    </Layout>
  );
}
