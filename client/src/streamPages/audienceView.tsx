import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import HandelParticipant from "./streamUtlis/participants";
import { useParams } from "react-router-dom";

export default function AudienceView() {
    const socket = useSocketContext();
    const hostName = Object.values(useParams())[0]

    useEffect(() => {
        if (socket) {
            socket.emit('getUsers', hostName)

            const handleBeforeUnload = () => {
                socket.emit("leaveRoom", hostName)
            }

            window.addEventListener('beforeunload', handleBeforeUnload)

            return () => {
                socket.off('getUsers')
                window.removeEventListener('beforeunload', handleBeforeUnload)
            }
        }
    }, [socket, hostName])


    return <div>
        <h1>AudienceView</h1>
        <HandelParticipant />
    </div>
}