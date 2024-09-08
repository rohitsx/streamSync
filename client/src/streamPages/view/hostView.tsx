import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocketContext } from "../../context/socketContext";
import NotifcationBox from "../../assets/notification/notification";
import HandelParticipant from "../streamUtlis/participants";
import useDefaultPage from "../../hook/useDefaultPage";
import ConnectedUser from "../streamUtlis/connectedUser";
import styles from '../style/hostView.module.css'
import getKeyPair from "../../utils/getkeyPair";


export default function HostView() {
    const username = useMemo(() => localStorage.getItem('username') || '', []);
    const [notification, setNotification] = useState<string | null>(null)
    const socket = useSocketContext();
    const navigate = useNavigate();
    const [updateDefaultPage] = useDefaultPage()
    const [StrangerData, setStrangerData] = useState<{
        username: string | null,
        socketId: string | null
    }>({ username: null, socketId: null })


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        if (socket) {
            validateToken(token)
            socket.on('joiningLastRoom', () => {
                const dp = localStorage.getItem('deaultPage')
                dp !== 'host' && setNotification('Joining last room')
            })
            socket.on('getSocketId', (data) => setStrangerData({ username: data.username, socketId: data.SocketId }))

            return () => {
                socket.off('joiningLastRoom')
                socket.off('getSocketId')
            }
        }

    }, [socket]);

    async function validateToken(token: string) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}validate-token`, { token });
            const validatedUsername = response.data.username;

            const keyPair = getKeyPair();

            if (validatedUsername === username && socket) {
                socket.emit('createRoom', { roomId: username, publicKey: keyPair.publicKey.toString() });
                localStorage.setItem('defaultPage', 'host')
                socket.emit('getUsers', username);

            } else {
                throw new Error('Token validation failed');
            }

        } catch (error: any) {
            console.error('Token validation or room creation failed', error.message);
            navigate('/home');
        }
    }


    function changePage() {
        const roomId = localStorage.getItem('username')
        
        socket && socket.emit('closeRoom', roomId)
        updateDefaultPage('home')
        navigate('/home')
    }

    return (
        <div className={styles.hostContainer}>
            <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
            <ConnectedUser username={username} strangerData={StrangerData} setStrangerData={setStrangerData} view={'host'} />
            <HandelParticipant getUsername={true} />
            <button className={styles.closeButton} onClick={changePage}>Close Room</button>
        </div>
    );
}