import React from "react"
import { Socket } from "socket.io-client";
import { useSocketContext } from "../../context/socketContext";


interface ConnectedUserProps {
    username: string | null,
    strangerData: { username: string | null, socketId: string | null }
    view: 'host' | 'audience'
    setStrangerData: (data: { username: string | null, socketId: string | null }) => void
}

export default function ConnectedUser({ username = null, strangerData, setStrangerData, view }: ConnectedUserProps) {

    console.log(strangerData);
    
    const socket: Socket | null = useSocketContext()
    function hangUpCall(e: React.FormEvent) {
        e.preventDefault();
        setStrangerData({ username: null, socketId: null });
        socket?.emit('hangupCall', strangerData.socketId);
    }

    function muteCall(e: React.FormEvent) {
        e.preventDefault();

    }

    return <div>
        {strangerData.socketId ? (<div>
            <div>{username}</div>
            <div onClick={hangUpCall}>Hangup Call</div>
            <div onClick={muteCall}>Mute Call</div>
            <div>{strangerData.username}</div>
        </div>) : (<div>{username}</div>)}
    </div>
}