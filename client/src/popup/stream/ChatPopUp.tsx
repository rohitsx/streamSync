import { useCallback, useMemo, useState } from "react";
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

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4">
          {stranger && (
            <Call
              stranger={stranger}
              setStranger={setStranger}
              webSocket={webSocket}
              userType={"host"}
            />
          )}
          <StreamChat
            startCall={startCall}
            webSocket={webSocket}
          />
        </main>
      </div>
    </div>
  );
};

export default ChatPopUp;
