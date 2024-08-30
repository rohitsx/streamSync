import { useEffect, useState } from "react";
import { useSocketContext } from "../context/socketContext";
import HandelParticipant from "./streamUtlis/participants";
import { useNavigate, useParams } from "react-router-dom";
import useDefaultPage from "../hook/useDefaultPage";
import NotifcationBox from "../assets/notification/notification";

export default function AudienceView() {
    const socket = useSocketContext();
    const roomId = Object.values(useParams())[0]
    const [updateDefaultPage] = useDefaultPage()
    const navigate = useNavigate()
    const [notificationMessage, setNotification] = useState<string | null>(null)

    useEffect(() => {
        localStorage.setItem('defaultPage', 'audience')
        if (!roomId) {
            navigate(`/join/${localStorage.getItem('roomId')}`)
            return
        }
        if (socket && roomId) {
            socket.emit('getUsers', roomId)
            socket.on('closeRoom', () => {
                setNotification('host closed room redirecting home')
            })
            const timer = setTimeout(() => {
                navigate('/home')
            }, 4000);


            return () => {
                socket.off('closeRoom')
                clearTimeout(timer)
            }
        }
    }, [socket, roomId])

    function changePage() {
        socket && socket.emit('leaveRoom', roomId)
        updateDefaultPage('home')
        navigate('/home')
    }
    return <div>
        <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />
        <button onClick={changePage}>Leave Room</button>
        <h1>AudienceView</h1>
        <HandelParticipant />
    </div>
}