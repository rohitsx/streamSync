import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Phone, PhoneOff } from "lucide-react";
import useWebRtc from "@/hook/useWebRtc";

type CallStatus = "connecting" | "connect" | "connected" | "disconnected";

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
  const [status, setStatus] = useState<CallStatus>("connecting");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { pc, sendOffer, resetPc } = useWebRtc({
    stranger,
    webSocket,
    audioRef,
    politeInstance: userType === "host",
  });

  const handleDisconnect = useCallback(() => {
    setStatus("disconnected");
    console.log("disconnected");
    setStranger(undefined);
    resetPc();
  }, [pc]);

  const handleConnect = useCallback(() => {
    sendOffer();
    console.log("recived handle connect");
    setStatus("connected");
  }, [pc]);

  const handleStatusChange = useCallback((newStatus: CallStatus) => {
    setStatus(newStatus);
    webSocket.send(
      JSON.stringify({ callStatus: { callStatus: newStatus, to: stranger } }),
    );

    if (newStatus === "disconnected") handleDisconnect();
    if (newStatus === "connect") handleConnect();
  }, [pc]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const { callStatus } = JSON.parse(e.data);
      if (!callStatus) return;

      callStatus === "disconnected" && handleDisconnect();
      callStatus === "connect" && handleConnect();
      console.log();
    };
    webSocket.addEventListener("message", handleMessage);
    return () => {
      webSocket.removeEventListener("message", handleMessage);
    };
  }, [webSocket, pc]);

  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "connected":
        return "bg-blue-500";
      case "connecting":
        return "bg-blue-400";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  const getInitialAvatar = () => {
    const initial = stranger ? stranger[0].toUpperCase() : "?";
    return { initial, backgroundColor: "bg-blue-900" };
  };

  const avatar = useMemo(() => getInitialAvatar(), []);

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 blur-sm flex items-center justify-center"
      style={{ transform: userType === "audience" ? "scale(2)" : "none" }}
    >
      <div
        className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center gap-6 w-80 border border-blue-900/30 shadow-2xl shadow-blue-500/10"
        style={userType === "audience"
          ? { width: "11%" }
          : { transform: "none" }}
      >
        <audio ref={audioRef} className="hidden" />

        <div className="bg-blue-950 w-20 h-20 rounded-2xl flex items-center justify-center mb-2 transform hover:scale-105 transition-all duration-300 border border-blue-800/30 shadow-lg shadow-blue-900/20">
          <span className="text-blue-200 text-3xl font-medium">
            {avatar.initial}
          </span>
        </div>

        <span className="text-slate-200 text-xl font-medium capitalize">
          {stranger || "Unknown User"}
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {status === "connecting"
              ? (
                <div className="relative">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor()} animate-ping absolute opacity-75`}
                  />
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor()} relative animate-pulse`}
                  />
                </div>
              )
              : (
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}
                />
              )}
            <span className="text-blue-300 text-sm capitalize">
              {status}
            </span>
          </div>
        </div>

        <div className="flex gap-6 mt-6">
          {userType !== "host" && status === "connecting" && (
            <button
              onClick={() => handleStatusChange("connect")}
              className="p-4 rounded-2xl bg-blue-950 hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 border border-blue-800/30"
            >
              <Phone className="w-6 h-6 text-blue-300" />
            </button>
          )}
          <button
            onClick={() => handleStatusChange("disconnected")}
            className="p-4 rounded-2xl bg-red-950/50 hover:bg-red-900/50 transition-all duration-300 transform hover:scale-105 border border-red-800/30"
          >
            <PhoneOff className="w-6 h-6 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Call;
