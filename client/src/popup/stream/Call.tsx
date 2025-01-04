import { Mic, MicOff, PhoneOff, User } from "lucide-react";

interface CallProps {
	calleeUsername: string;
	callStatus: "idle" | "connecting" | "connected";
	isMuted: boolean;
	setIsMuted: (isMuted: boolean) => void;
	endCall: () => void;
}

export default function Call(
  { calleeUsername, callStatus, isMuted, setIsMuted, endCall }: CallProps,
) {
  return (
    <>
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
                  onClick={endCall}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
