import React, { useRef } from "react"
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
    const audioElement = useRef<HTMLAudioElement | null>(null)
    // startMic({ audioElement: audioElement, strangerData: strangerData, view: view });

    function hangUpCall(e: React.FormEvent) {
        e.preventDefault();
        setStrangerData({ username: null, socketId: null });
        socket?.emit('hangupCall', strangerData.socketId);
    }

    function muteCall(e: React.FormEvent) {
        e.preventDefault();
        if (audioElement.current) {
            audioElement.current.muted = !audioElement.current.muted;
        }
    }

    return (
        <PeerConnectionProvider>
            <div>
                {strangerData.socketId ? (
                    <div>
                        <div>{username}</div>
                        <div onClick={hangUpCall}>Hangup Call</div>
                        <StartMic strangerData={strangerData} view={view} />
                        <div onClick={muteCall}>{audioElement.current?.muted ? 'Unmute' : 'Mute'} Call</div>
                        <div>{strangerData.username}</div>
                    </div>) : (
                    <div>{username}</div>
                )}
            </div>
        </PeerConnectionProvider>
    )
}