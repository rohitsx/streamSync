import React, { useCallback, useEffect, useState } from "react"
import { Socket } from "socket.io-client";
import { useSocketContext } from "../../context/socketContext";
import StartMic from "../webRtcSpecific/webRtc";
import { PeerConnectionProvider } from "../../context/peerConnectionContext";
import styles from "../style/connectedUser.module.css"

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

    const hangUpCall = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (socket) {
            socket.emit('hangupCall', strangerData.socketId);
            view === "audience" && socket.emit('removePrimeUser', localStorage.getItem('roomId'));
        }
        setEndCall(true)
        setStrangerData({ username: null, socketId: null });
    }, [strangerData, socket])

    function muteCall(e: React.FormEvent) {
        e.preventDefault();
        setToggelMic(!toggelMic);
        setEndCall(true)
    }

    useEffect(() => {
        socket && socket.on('hangupCall', () => {
            console.log('recieved hangup message')
            setStrangerData({ username: null, socketId: null });
            view === "audience" && socket.emit('removePrimeUser', localStorage.getItem('roomId'))
            setEndCall(true)
        });
    }, [])


    return (
        <PeerConnectionProvider>
            <div className={styles['connected-user']}>
                {strangerData.socketId ? (
                    <div className={styles['call-controls']}>
                        <div className={styles['user-name']}>{username}</div>
                        <div className={styles['hangup-call']} onClick={hangUpCall} title="Hang up"></div>
                        < StartMic strangerData={strangerData} view={view} toggelMic={toggelMic} endCall={endCall} setEndCall={setEndCall} />
                        <div
                            className={`${styles['mute-call']} ${!toggelMic ? styles['unmuted'] : ''}`}
                            onClick={muteCall}
                            title={toggelMic ? 'Unmute' : 'Mute'}
                        ></div>
                        <div className={`${styles['stranger-name']} ${!strangerData.socketId && styles['stranger-name-exit']}`}>
                            {strangerData.username}
                        </div>
                    </div>
                ) : (
                    <div className={styles['user-name']}>{view === 'host' ? localStorage.getItem('username') : localStorage.getItem('roomId')}</div>
                )}
            </div>
        </PeerConnectionProvider>
    )
}