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
    <div
      className={"min-h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center bg-[length:400%_400%] animate-gradient"}
    >
      <div className="w-full max-w-4xl flex flex-col h-screen">
        <Header />
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
      </div>
    </div>
  );
};

export default ChatPopUp;
