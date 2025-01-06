import React, { useCallback, useEffect, useState } from "react";
import { Phone, PhoneOff } from "lucide-react";
import UserLogoCall from "./UserLogoCall";

type CallStatus = "ringing" | "connect" | "connected" | "disconnected";

interface CallProps {
  hostName: string;
  webSocket: WebSocket;
  setHostName: (hostName: string | null) => void;
}

const Call: React.FC<CallProps> = ({
  hostName,
  webSocket,
  setHostName,
}) => {
  const [status, setStatus] = useState<CallStatus>("ringing");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [status]);

  const handleDisconnect = useCallback(() => {
    setStatus("disconnected");
    setHostName(null);
  }, [webSocket]);

  const handleStatusChange = useCallback((newStatus: CallStatus) => {
    setStatus(newStatus);
    webSocket.send(
      JSON.stringify({ callStatus: { callStatus: newStatus, to: hostName } }),
    );

    if (newStatus === "disconnected") handleDisconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { callStatus } = JSON.parse(e.data);
      if (callStatus === "disconnect") handleDisconnect();
    };
    webSocket.addEventListener("message", handleMessage);
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [webSocket]);

  return (
    <div className="h-full flex flex-col ">
      <UserLogoCall
        isVisible={isVisible}
        status={status}
        hostName={hostName}
      />
      <div className="p-8">
        <div className="flex justify-center items-center gap-8">
          {status === "ringing" && (
            <button
              onClick={() => handleStatusChange("connect")}
              className={`p-8 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/25`}
            >
              <Phone className="w-10 h-10 text-white" />
            </button>
          )}
          <button
            onClick={() => handleStatusChange("disconnected")}
            className={`p-8 rounded-full bg-rose-500 hover:bg-rose-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-rose-500/25`}
          >
            <PhoneOff className="w-10 h-10 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Call;
