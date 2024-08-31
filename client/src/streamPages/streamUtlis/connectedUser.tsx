import React, { useEffect, useState } from "react"
import { Socket } from "socket.io-client";
import { useSocketContext } from "../../context/socketContext";
import StartMic from "../webRtcSpecific/webRtc";
import { PeerConnectionProvider } from "../../context/peerConnectionContext";

interface ConnectedUserProps {
    username: string | null,
    strangerData: { username: string | null, socketId: string | null }
    view: 'host' | 'audience'
    setStrangerData: (data: { username: string | null, socketId: string | null }) => void
}

export default function ConnectedUser({ username = null, strangerData, setStrangerData, view }: ConnectedUserProps) {
    const socket: Socket | null = useSocketContext()
    const [toggelMic, setToggelMic] = useState(true)
    const [endCall, setEndCall] = useState(false)

    function hangUpCall(e: React.FormEvent) {
        e.preventDefault();
        if (socket) {
            socket.emit('hangupCall', strangerData.socketId);

        }
        setEndCall(true)
        setStrangerData({ username: null, socketId: null });
    }

    function muteCall(e: React.FormEvent) {
        e.preventDefault();
        setToggelMic(!toggelMic);
        setEndCall(true)
    }

    useEffect(() => {
        socket && socket.on('hangupCall', () => {
            setStrangerData({ username: null, socketId: null });
            setEndCall(true)
        });
    }, [])

    return (
        <PeerConnectionProvider>
            <div className="connected-user">
                {strangerData.socketId ? (
                    <div className="call-controls">
                        <div className="user-name">{username}</div>
                        <div className="hangup-call" onClick={hangUpCall}>Hangup Call</div>
                        <StartMic strangerData={strangerData} view={view} toggelMic={toggelMic} endCall={endCall} setEndCall={setEndCall} />
                        <div className="mute-call" onClick={muteCall}>{toggelMic ? 'Mute' : 'Unmute'} Call</div>
                        <div className="stranger-name">{strangerData.username}</div>
                    </div>
                ) : (
                    <div className="user-name">{username}</div>
                )}
            </div>

        </PeerConnectionProvider>
    )
}