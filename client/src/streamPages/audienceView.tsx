import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import HandelParticipant from "./streamUtlis/participants";
import { useNavigate, useParams } from "react-router-dom";
import useDefaultPage from "../hook/useDefaultPage";

export default function AudienceView() {
    const socket = useSocketContext();
    const roomId = Object.values(useParams())[0]
    const [updateDefaultPage] = useDefaultPage()
    const navigate = useNavigate()    

    useEffect(() => {
        localStorage.setItem('defaultPage', 'audience')
        if (!roomId) {
            navigate(`/join/${localStorage.getItem('roomId')}`)
            return
        }
        if (socket && roomId) {
            socket.emit('getUsers', roomId)

            return () => {
                socket.off('getUsers')
            }
        }
    }, [socket, roomId])

    function changePage() {
        socket && socket.emit('leaveRoom', roomId)
        updateDefaultPage('home')
        navigate('/home')
    }
    return <div>
        <button onClick={changePage}>Leave Room</button>
        <h1>AudienceView</h1>
        <HandelParticipant />
    </div>
}