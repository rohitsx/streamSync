import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/socketContext";
import HandelParticipant from "../streamUtlis/participants";
import useDefaultPage from "../../hook/useDefaultPage";
import ConnectedUser from "../streamUtlis/connectedUser";
import NotifcationBox from "../../assets/notification/notification";
import SendSoal from "../../PaymentComponent/crypto/soal/soal";
import styles from '../style/hostView.module.css'
import soalSend from "../../PaymentComponent/crypto/soal/sendSoal";

export default function AudienceView() {
    const username = useMemo(() => localStorage.getItem('username') || '', []);
    const roomId = useMemo(() => localStorage.getItem('roomId') || '', []);
    const socket = useSocketContext();
    const [updateDefaultPage] = useDefaultPage();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<string | null>(null);
    const [strangerData, setStrangerData] = useState<{
        username: string | null,
        socketId: string | null,
    }>({ username: null, socketId: null })
    const [amount, setAmount] = useState(0.00);

    useEffect(() => {

        socket?.emit('joinRoom', roomId);
    }, [socket])


    useEffect(() => {
        localStorage.setItem('defaultPage', 'audience');
        if (!socket || !roomId) return;

        const handleCloseRoom = () => {
            setNotification('Host closed room. Redirecting home...');
            localStorage.setItem('defaultPage', 'home');
            setTimeout(() => navigate('/home'), 3000);
        };

        const handleGetSocketId = (data: { username: string, socketId: string, hostPublicKey: string }) => {
            setStrangerData({
                username: data.username,
                socketId: data.socketId
            });
            soalSend(data.hostPublicKey, amount)

        };
        
        socket.on('getSocketId', handleGetSocketId);
        socket.on('invalidRoom', handleCloseRoom);

        return () => {
            socket.off('closeRoom', handleCloseRoom);
            socket.off('getSocketId', handleGetSocketId);
            socket.off('getUsers');
        };
    }, [socket, roomId, navigate, amount]);
    const handleCloseRoom = () => {
        setNotification('Host closed room. Redirecting home...');
        localStorage.setItem('defaultPage', 'home');
        setTimeout(() => navigate('/home'), 3000);
    };

    socket?.on('closeRoom', handleCloseRoom);

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
        <div className={styles.hostContainer}>
            <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
            <ConnectedUser username={username} strangerData={strangerData} setStrangerData={setStrangerData} view="audience" />
            <HandelParticipant />
            <SendSoal setAmount={setAmount} amount={amount} />
            <button onClick={changePage} className={styles.closeButton}>Leave Room</button>
        </div>
    );
}
