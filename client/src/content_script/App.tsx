import { ContentBackground } from "@/layout/contentScriptLayout";
import ChatBox from "./component/chatBox/chatBox";
import { useEffect, useState } from "react";
import useWebSocket from "@/hook/useWebSocket";
import Call from "@/components/call/Call";

export default function App() {
  const webSocket = useWebSocket();
  const [stranger, setStranger] = useState<string | undefined>();

  useEffect(() => {
    try {
      const handleMessage = async (ev: MessageEvent) => {
        const { startCall } = JSON.parse(ev.data);
        if (!startCall) return;
        setStranger(startCall.hostName);
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
      {stranger && webSocket
        ? (
          <Call
            stranger={stranger}
            webSocket={webSocket}
            setStranger={setStranger}
            userType={"audience"}
          />
        )
        : <ChatBox webSocket={webSocket} />}
    </ContentBackground>
  );
}
