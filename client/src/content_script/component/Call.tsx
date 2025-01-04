import React, { useEffect, useState } from "react";
import { Phone, PhoneOff } from "lucide-react";
import UserLogoCall from "./UserLogoCall";

type CallStatus = "ringing" | "connected" | "disconnected";

interface CallProps {
  hostName: string;
  webSocket: WebSocket;
}

const Call: React.FC<CallProps> = ({
  hostName,
  webSocket,
}) => {
  const [status, setStatus] = useState<CallStatus>("ringing");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [status]);

  const handleStatusChange = (newStatus: CallStatus) => {
    setStatus(newStatus);
    const reponse = { accepted: newStatus === "connected" };
  };

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
              onClick={() => handleStatusChange("connected")}
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
