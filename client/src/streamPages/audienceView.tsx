import { useEffect, useState, useMemo } from "react";
import { useSocketContext } from "../context/socketContext";
import HandelParticipant from "./streamUtlis/participants";
import { useNavigate, useParams } from "react-router-dom";
import useDefaultPage from "../hook/useDefaultPage";
import NotifcationBox from "../assets/notification/notification";
import ConnectedUser from "./streamUtlis/connectedUser";

export default function AudienceView() {
    const username = useMemo(() => localStorage.getItem('username') || '', []);
    const socket = useSocketContext();
    const roomId = Object.values(useParams())[0]
    const [updateDefaultPage] = useDefaultPage()
    const navigate = useNavigate()
    const [notificationMessage, setNotification] = useState<string | null>(null)
    const [StrangerData, setStrangerData] = useState<{
        username: string | null,
        socketId: string | null
    }>({ username: null, socketId: null })

    useEffect(() => {
        localStorage.setItem('defaultPage', 'audience')
        if (!roomId) navigate(`/join/${localStorage.getItem('roomId')}`)
    }, [])

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', localStorage.getItem('hostname'))
            socket.emit('getUsers', roomId)
            socket.on('closeRoom', () => {
                setNotification('host closed room redirecting home')
                localStorage.setItem('defaultPage', 'home')
                setTimeout(() => {
                    navigate('/home')
                }, 3000)

            })
            socket.on('getSocketId', (v) => {
                setStrangerData(v)
                console.log(v);
            })

            return () => {
                socket.off('getusers');
                socket.off('closerRoom');
                socket.off('getsocketid');
            }
        }
    }, [socket])

    function changePage() {
        socket && socket.emit('leaveRoom', roomId)
        updateDefaultPage('home')
        navigate('/home')
    }
    return <div>
        <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />
        <h1>AudienceView</h1>
        <ConnectedUser username={username} strangerData={StrangerData} view={'audience'} />
        <HandelParticipant />
        <button onClick={changePage}>Leave Room</button>
    </div>
}