import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import StreamChat from "./streamChat";
import env from "@/config/enviroment";
import Call from "@/components/call/Call";

const ChatPopUp = () => {
  const params = useParams();
  const [stranger, setStranger] = useState<string | undefined>();

  const webSocket = useMemo(() => {
    const url =
      `${env.wsApi}create-room?streamId=${params.streamId}&accessToken=${params.token}&username=${params.username}`;
    return new WebSocket(url);
  }, []);

  const startCall = useCallback((calleeUsername: string) => {
    webSocket.send(JSON.stringify({ startCall: { calleeUsername } }));
    setStranger(calleeUsername);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      webSocket.send(JSON.stringify({ streamStatus: { status: "end" } }));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [webSocket]);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 overflow-hidden ">
      <Header />
      <main className="flex-1 flex flex-col gap-4 p-4">
        <StreamChat
          startCall={startCall}
          webSocket={webSocket}
        />

        {stranger && (
          <Call
            stranger={stranger}
            setStranger={setStranger}
            webSocket={webSocket}
            userType={"host"}
          />
        )}
      </main>
    </div>
  );
};

export default ChatPopUp;
