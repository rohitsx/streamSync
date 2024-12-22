import { useState, useEffect } from "react";
import { Background } from "@/layout/Layout";
import { MessageRequest } from "@/types/bgType";

export default function App() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const messageListener = (
      request: MessageRequest,
      _sender: chrome.runtime.MessageSender,
    ) => {
      if (request.action === "isLive") {
        setIsLive(true);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return isLive ? <Background>Hiii</Background> : null;
}
