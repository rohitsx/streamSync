import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Call from "./Call";
import StreamChat from "./streamChat";

const ChatPopUp = () => {
  const params = useParams();
  const [calleeUsername, setCalleeUsername] = useState<string | undefined>();
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "connected"
  >("idle");

  const webSocket = useMemo(() => {
    const url =
      `${import.meta.env.VITE_WS}create-room?streamId=${params.streamId}&accessToken=${params.token}&username=${params.username}`;
    return new WebSocket(url);
  }, []);

  const startCall = useCallback((calleeUsername: string) => {
    webSocket.send(JSON.stringify({ startCall: { calleeUsername } }));
    setCalleeUsername(calleeUsername);
    setCallStatus("connecting");
  }, []);

  const endCall = useCallback(() => {
    webSocket.send(
      JSON.stringify({
        callStatus: { callStatus: "disconnect", to: calleeUsername },
      }),
    );
    setCallStatus("idle");
    setCalleeUsername(undefined);
  }, [webSocket, calleeUsername]);

  return (
    <div
      className={"min-h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center bg-[length:400%_400%] animate-gradient"}
    >
      <div className="w-full max-w-4xl flex flex-col h-screen">
        <Header />
        <Call
          calleeUsername={calleeUsername}
          callStatus={callStatus}
          endCall={endCall}
          webSocket={webSocket}
        />
        <StreamChat
          startCall={startCall}
          webSocket={webSocket}
        />
      </div>
    </div>
  );
};

export default ChatPopUp;
