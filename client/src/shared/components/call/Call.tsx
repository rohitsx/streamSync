import React, { useCallback, useEffect, useRef, useState } from "react";
import { Phone, PhoneOff } from "lucide-react";
import useWebRtc from "@/hook/useWebRtc";

type CallStatus = "ringing" | "connect" | "connected" | "disconnected";

interface CallProps {
  stranger: string;
  webSocket: WebSocket;
  setStranger: (hostName: string | undefined) => void;
  userType: "host" | "audience";
}

const Call: React.FC<CallProps> = ({
  stranger,
  webSocket,
  setStranger,
  userType,
}) => {
  const [status, setStatus] = useState<CallStatus>("ringing");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { start, sendOffer, handleOffer, resetPc } = useWebRtc({
    stranger,
    webSocket,
    audioRef,
    politeInstance: userType === "host",
  });

  const handleDisconnect = useCallback(() => {
    console.log("working");
    setStatus("disconnected");
    setStranger(undefined);
    resetPc();
  }, []);

  const handleConnect = useCallback(() => {
    start();
    sendOffer();
    handleOffer();
    setStatus("connected");
  }, []);

  const handleStatusChange = useCallback((newStatus: CallStatus) => {
    setStatus(newStatus);
    webSocket.send(
      JSON.stringify({ callStatus: { callStatus: newStatus, to: stranger } }),
    );

    if (newStatus === "disconnected") handleDisconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { callStatus } = JSON.parse(e.data);
      if (!callStatus) return;

      callStatus === "disconnected" && handleDisconnect();
      callStatus === "connect" && handleConnect();
    };
    webSocket.addEventListener("message", handleMessage);
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [webSocket]);

  return (
    <div className="flex flex-col ">
      <audio ref={audioRef} className="hidden"></audio>
      <h1>status: {status}</h1>
      <div className="p-8">
        {userType !== "host" && status === "ringing" && (
          <button
            onClick={() => handleStatusChange("connect")}
            className={`p-6 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/25`}
          >
            <Phone className="w-10 h-10 text-white" />
          </button>
        )}

        <button
          onClick={() => handleStatusChange("disconnected")}
          className={`p-6 rounded-full bg-rose-500 hover:bg-rose-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-rose-500/25`}
        >
          <PhoneOff className="w-10 h-10 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Call;
