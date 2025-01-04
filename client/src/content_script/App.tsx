import { ContentBackground } from "@/layout/contentScriptLayout";
import ChatBox from "./component/chatBox/chatBox";
import { useEffect, useState } from "react";
import useWebSocket from "@/hook/useWebSocket";
import Call from "./component/Call";


export default function App() {
  const webSocket = useWebSocket();
  const [hostName, setHostName] = useState<string>();

  useEffect(() => {
    try {
      const handleMessage = async (ev: MessageEvent) => {
        const { startCall } = JSON.parse(ev.data);
        setHostName(startCall.hostName);
      };

      webSocket?.addEventListener("message", handleMessage);
      return () => {
        webSocket?.removeEventListener("message", handleMessage);
      };
    } catch (e) {
      console.log(e);
    }
  }, [webSocket]);

  return (
    <ContentBackground>
      {hostName
        ? <Call hostName={hostName} />
        : <ChatBox webSocket={webSocket} />}
    </ContentBackground>
  );
}
