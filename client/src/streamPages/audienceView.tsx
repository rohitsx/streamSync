import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../context/socketContext";
import HandelParticipant from "./streamUtlis/participants";
import useDefaultPage from "../hook/useDefaultPage";
import ConnectedUser from "./streamUtlis/connectedUser";
import NotifcationBox from "../assets/notification/notification";

export default function AudienceView() {
    const username = useMemo(() => localStorage.getItem('username') || '', []);
    const roomId = useMemo(() => localStorage.getItem('roomId') || '', []);
    const socket = useSocketContext();
    const [updateDefaultPage] = useDefaultPage();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<string | null>(null);
    const [strangerData, setStrangerData] = useState<{
        username: string | null,
        socketId: string | null
    }>({ username: null, socketId: null })
    useEffect(() => {
        localStorage.setItem('defaultPage', 'audience');
        if (!socket || !roomId) return;

        socket.emit('joinRoom', roomId);
        socket.emit('getUsers', roomId);

        const handleCloseRoom = () => {
            setNotification('Host closed room. Redirecting home...');
            localStorage.setItem('defaultPage', 'home');
            setTimeout(() => navigate('/home'), 3000);
        };

        const handleGetSocketId = (data: { username: string, socketId: string }) => {
            setStrangerData(data);
            console.log(data);
        };

        socket.on('closeRoom', handleCloseRoom);
        socket.on('getSocketId', handleGetSocketId);

        return () => {
            socket.off('closeRoom', handleCloseRoom);
            socket.off('getSocketId', handleGetSocketId);
            socket.off('getUsers');
        };
    }, [socket, roomId, navigate]);

    const changePage = useCallback(() => {
        if (socket && roomId) {
            socket.emit('leaveRoom', roomId);
        }
        updateDefaultPage('home');
        navigate('/home');
    }, [socket, roomId, updateDefaultPage, navigate]);

    if (!roomId) {
        return <div>Error: No room ID found. Please join a room first.</div>;
    }

    return (
        <div>
            <h1>AudienceView</h1>
            <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
            <ConnectedUser username={username} strangerData={strangerData} setStrangerData={setStrangerData} view="audience" />
            <HandelParticipant />
            <button onClick={changePage}>Leave Room</button>
        </div>
    );
}