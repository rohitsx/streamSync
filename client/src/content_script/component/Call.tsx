import React, { useEffect, useState } from "react";
import { Mic, MicOff, Phone, PhoneOff, User } from "lucide-react";

type CallStatus = "ringing" | "connected" | "disconnected";

interface CallProps {
  hostName: string;
  onStatusChange?: (status: CallStatus) => void;
  onMuteChange?: (isMuted: boolean) => void;
}

const Call: React.FC<CallProps> = ({
  hostName,
  onStatusChange,
  onMuteChange,
}) => {
  const [status, setStatus] = useState<CallStatus>("ringing");
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    let interval: NodeJS.Timeout;

    if (status === "connected") {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [status]);

  const handleStatusChange = (newStatus: CallStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    onMuteChange?.(newMutedState);
  };

  const colors = {
    gradient: {
      primary: "from-indigo-500 to-violet-500",
      ring1: "border-indigo-400/30",
      ring2: "border-violet-400/20",
    },
    buttons: {
      mute: {
        active: "bg-indigo-500 hover:bg-indigo-600",
        inactive: "bg-gray-600 hover:bg-gray-500",
      },
      accept: "bg-emerald-500 hover:bg-emerald-600",
      decline: "bg-rose-500 hover:bg-rose-600",
    },
  };

  return (
    <div className="h-full flex flex-col ">
      <div className="flex-1 flex justify-center items-center">
        <div
          className={`relative ${
            isVisible ? "scale-100" : "scale-95"
          } transition-all duration-700 ease-out`}
        >
          <div
            className={`w-48 h-48 rounded-full bg-gradient-to-tr ${colors.gradient.primary} p-1`}
          >
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <User className="w-24 h-24 text-gray-200" />
            </div>
          </div>
          {status === "ringing" && (
            <>
              <div
                className={`absolute inset-0 -m-2 rounded-full border-2 ${colors.gradient.ring1} animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]`}
              />
              <div
                className={`absolute inset-0 -m-4 rounded-full border-2 ${colors.gradient.ring2} animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]`}
              />
            </>
          )}
          <h2 className="mt-6 text-4xl font-bold text-white text-center">
            {hostName}
          </h2>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={handleMuteToggle}
            className={`p-6 rounded-full transition-all duration-300 hover:scale-110 ${
              isMuted
                ? colors.buttons.mute.inactive
                : colors.buttons.mute.active
            } shadow-lg hover:shadow-indigo-500/25`}
          >
            {isMuted
              ? <MicOff className="w-8 h-8 text-gray-200" />
              : <Mic className="w-8 h-8 text-white" />}
          </button>
          {status === "ringing"
            ? (
              <>
                <button
                  onClick={() => handleStatusChange("connected")}
                  className={`p-8 rounded-full ${colors.buttons.accept} transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/25`}
                >
                  <Phone className="w-10 h-10 text-white" />
                </button>
                <button
                  onClick={() => handleStatusChange("disconnected")}
                  className={`p-8 rounded-full ${colors.buttons.decline} transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-rose-500/25`}
                >
                  <PhoneOff className="w-10 h-10 text-white" />
                </button>
              </>
            )
            : (
              <button
                onClick={() => handleStatusChange("disconnected")}
                className={`p-8 rounded-full ${colors.buttons.decline} transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-rose-500/25`}
              >
                <PhoneOff className="w-10 h-10 text-white" />
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Call;
