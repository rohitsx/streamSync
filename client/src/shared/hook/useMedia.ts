import { useCallback } from "react";

export default function useMedia() {
  const getStream = useCallback(async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        //  video: {
        //  width: { max: 1920 },
        // height: { max: 1080 },
        //},
        audio: true,
      });
    } catch (err) {
      console.log("Error accessing local media stream", err);
      return null;
    }
  }, []);

  const closeStream = useCallback((stream: MediaStream) => {
    if (!stream) return;
    stream.getTracks().forEach((track) => track.stop());
  }, []);

  return { getStream, closeStream };
}
