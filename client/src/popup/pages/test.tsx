import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Camera, CameraOff, Mic, MicOff, PhoneOff, User } from "lucide-react";
import { MessageProp } from "@/types/api";

const ChatPopUp = () => {
  const params = useParams();
  const [calleeUsername, setCalleeUsername] = useState<string | undefined>();
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "connected"
  >("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const webSocket = useMemo(() => {
    const url =
      `${import.meta.env.VITE_WS}create-room?streamId=${params.streamId}&accessToken=${params.token}&username=${params.username}`;
    return new WebSocket(url);
  }, []);

  useEffect(() => {
    const handleMessage = (ev: MessageEvent) => {
      const { liveMessage } = JSON.parse(ev.data);
      if (!liveMessage) return;
      setMessages((prev) => [...prev, liveMessage]);
    };
    webSocket.addEventListener("message", handleMessage);
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [webSocket]);

  const startCall = useCallback((calleeUsername: string) => {
    webSocket.send(JSON.stringify({ startCall: { calleeUsername } }));
    setCalleeUsername(calleeUsername);
    setCallStatus("connecting");
    // Simulate connection after 2 seconds
    setTimeout(() => setCallStatus("connected"), 2000);
  }, []);

  const endCall = useCallback(() => {
    setCallStatus("idle");
    setCalleeUsername(undefined);
    setIsMuted(false);
    setIsVideoOff(false);
  }, []);

  const isNewTab = useMemo(() => {
    const popup = window.innerWidth <= 380 && window.innerHeight <= 600;
    return !popup;
  }, []);

  return (
    <div
      className={`min-h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
      ${
        isNewTab
          ? "flex items-center justify-center bg-[length:400%_400%] animate-gradient"
          : ""
      }`}
    >
      <div className="w-full max-w-4xl flex flex-col h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 p-4 rounded-t-lg shadow-lg">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            StreamSyn
          </h1>
        </div>

        {/* Call UI Section */}
        <div className="bg-gray-900 p-4">
          {callStatus !== "idle" && (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              {/* Call Status and User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {calleeUsername}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {callStatus === "connecting"
                        ? "Connecting..."
                        : "Connected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Call Controls */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-full ${
                      isMuted ? "bg-red-500" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {isMuted
                      ? <MicOff className="w-5 h-5" />
                      : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-2 rounded-full ${
                      isVideoOff
                        ? "bg-red-500"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {isVideoOff
                      ? <CameraOff className="w-5 h-5" />
                      : <Camera className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={endCall}
                    className="p-2 rounded-full bg-red-500 hover:bg-red-600"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video/Call Display Area */}
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                {isVideoOff
                  ? <div className="text-gray-500">Camera is off</div>
                  : (
                    <div className="text-gray-500">
                      Video stream would appear here
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto bg-gray-900 p-2 space-y-2">
          {messages?.map((msg) => (
            <div
              onClick={() => startCall(msg.user)}
              key={msg.id}
              className="group hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-300 ease-in-out border border-transparent hover:border-gray-700 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <span className="text-lg text-indigo-400 font-semibold">
                  {msg.user}
                </span>
                <p className="text-lg text-gray-200 font-medium leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPopUp;
