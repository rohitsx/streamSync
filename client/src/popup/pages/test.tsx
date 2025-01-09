import React, { useRef, useState } from "react";
import { MessageSquare, Phone, PhoneOff } from "lucide-react";

export default function StreamSyncChat() {
  const [stranger, setStranger] = useState<string | undefined>("koki");
  const [status, setStatus] = useState("connecting");
  const [userType] = useState("guest");
  const audioRef = useRef(null);

  const messages = [
    {
      id: 1,
      user: "Alice",
      message: "Hey, anyone want to chat about the new AI developments?",
    },
    {
      id: 2,
      user: "Bob",
      message: "I would love to discuss machine learning algorithms!",
    },
    {
      id: 3,
      user: "Charlie",
      message: "Count me in! Especially interested in neural networks.",
    },
    {
      id: 4,
      user: "Diana",
      message: "Looking for someone to discuss computer vision applications.",
    },
  ];

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === "disconnected") setStranger(undefined);
  };

  const startCall = (user) => {
    console.log(`Starting call with ${user}`);
    setStatus("ringing");
  };

  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "connected":
        return "bg-violet-500";
      case "connecting":
        return "bg-blue-500";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  const getInitialAvatar = () => {
    const initial = stranger ? stranger[0].toUpperCase() : "?";
    const colors = [
      "bg-blue-500",
      "bg-violet-500",
      "bg-indigo-500",
      "bg-purple-500"
    ];
    const colorIndex = stranger?.length % colors.length || 0;
    return { initial, backgroundColor: colors[colorIndex] };
  };

  const avatar = getInitialAvatar();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/60 border-b border-white/10">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-violet-400" />
            <h1 className="text-xl font-bold text-white">StreamSync Live Chat</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 md:px-6 py-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="group relative flex gap-4 p-4 rounded-xl 
                  hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-blue-500/10
                  transition-all duration-300 ease-in-out
                  border border-white/10 hover:border-violet-500/50
                  hover:scale-[1.01] hover:-translate-y-1
                  max-w-4xl mx-auto"
              >
                <div className="shrink-0 group-hover:animate-bounce">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-blue-500 to-indigo-500 
                    transform rotate-3 group-hover:rotate-0 transition-transform duration-300
                    flex items-center justify-center text-white font-bold shadow-lg
                    border border-white/20">
                    {msg.user[0].toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r 
                      from-violet-400 to-blue-400 group-hover:from-violet-300 
                      group-hover:to-blue-300 transition-all duration-300 truncate">
                      {msg.user}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-300 text-sm leading-relaxed
                    group-hover:text-white transition-colors duration-300">
                    {msg.message}
                  </p>
                </div>

                <button
                  onClick={() => startCall(msg.user)}
                  className="opacity-0 group-hover:opacity-100 absolute -right-2 -top-2
                    p-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 
                    hover:from-violet-400 hover:to-blue-400
                    transform hover:scale-110 hover:rotate-12
                    transition-all duration-300 shadow-lg
                    hover:shadow-violet-500/25"
                >
                  <Phone className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call Modal */}
        {stranger && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-950/95 rounded-xl p-8 flex flex-col items-center gap-6 w-80 border border-white/10">
              <audio ref={audioRef} className="hidden" />

              <div className={`${avatar.backgroundColor} w-20 h-20 rounded-full flex items-center justify-center mb-2`}>
                <span className="text-white text-3xl font-bold">
                  {avatar.initial}
                </span>
              </div>

              <span className="text-white text-xl font-medium capitalize">
                {stranger || "Unknown User"}
              </span>

              <div className="flex items-center gap-3">
                {status?.toLowerCase() === "connecting" ? (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-ping absolute opacity-75`} />
                      <div className={`w-3 h-3 rounded-full ${getStatusColor()} relative animate-bounce`} />
                    </div>
                    <span className="text-white text-lg capitalize">{status}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor()} ${status?.toLowerCase() === "connected" ? "animate-pulse" : ""}`} />
                    <span className="text-white text-lg capitalize">{status}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-6 mt-4">
                {userType !== "host" && status === "connecting" && (
                  <button
                    onClick={() => handleStatusChange("connected")}
                    className="p-4 rounded-full bg-violet-500 hover:bg-violet-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
                  >
                    <Phone className="w-8 h-8 text-white" />
                  </button>
                )}
                <button
                  onClick={() => handleStatusChange("disconnected")}
                  className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                >
                  <PhoneOff className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
