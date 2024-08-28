import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocketContext } from "../context/socketContext";
import NotifcationBox from "../assets/notification/notification";
import HandelParticipant from "./streamUtlis/participants";


export default function HostView() {
    const username = useMemo(() => localStorage.getItem('username') || '', []);
    const [notificationMessage, setNotification] = useState<string | null>(null);
    const socket = useSocketContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        if(socket) validateToken(token);

    }, [socket]);

    async function validateToken(token: string) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}validate-token`, { token });
            const validatedUsername = response.data.username;

            if (validatedUsername === username) {

                socket && socket.emit('createRoom', username);

            } else {
                throw new Error('Token validation failed');
            }
        } catch (error) {
            console.error('Token validation failed', error);
            setNotification('Server error, please try again later');
            navigate('/home');
        }
    };

    return (
        <div>
            <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />
            <h1>Host View</h1>
            <HandelParticipant />
        </div>
    );
}