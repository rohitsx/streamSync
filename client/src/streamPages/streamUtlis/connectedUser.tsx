import React, { useState } from "react"
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
    const [toggelMic, setToggelMic] = useState(false)

    function hangUpCall(e: React.FormEvent) {
        e.preventDefault();
        setStrangerData({ username: null, socketId: null });
        socket?.emit('hangupCall', strangerData.socketId);
    }

    function muteCall(e: React.FormEvent) {
        e.preventDefault();
        setToggelMic(!toggelMic);
    }

    return (
        <PeerConnectionProvider>
            <div>
                {strangerData.socketId ? (
                    <div>
                        <div>{username}</div>
                        <div onClick={hangUpCall}>Hangup Call</div>
                        <StartMic strangerData={strangerData} view={view} toggelMic={toggelMic}/>
                        <div onClick={muteCall}>{toggelMic ? 'Unmute' : 'Mute'} Call</div>
                        <div>{strangerData.username}</div>
                    </div>) : (
                    <div>{username}</div>
                )}
            </div>
        </PeerConnectionProvider>
    )
}