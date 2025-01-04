import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Call from "./Call";
import ChatPopupMessage from "./Message";

const ChatPopUp = () => {
  const params = useParams();
  const [calleeUsername, setCalleeUsername] = useState<string | undefined>();
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "connected"
  >("idle");
  const [isMuted, setIsMuted] = useState(false);

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
    setCallStatus("idle");
    setCalleeUsername(undefined);
    setIsMuted(false);
  }, []);

  return (
    <div
      className={"min-h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center bg-[length:400%_400%] animate-gradient"}
    >
      <div className="w-full max-w-4xl flex flex-col h-screen">
        <Header />
        <Call
          calleeUsername={calleeUsername || ""}
          callStatus={callStatus}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          endCall={endCall}
        />
        <ChatPopupMessage
          startCall={startCall}
          webSocket={webSocket}
        />
      </div>
    </div>
  );
};

export default ChatPopUp;
