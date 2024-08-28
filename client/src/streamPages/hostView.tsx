import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocketContext } from "../context/socketContext";
import NotifcationBox from "../assets/notification/notification";

interface Participant {
    socketId: string;
    username: string;
}

type ParticipantsMap = Map<string, Participant[]>;

export default function HostView() {
    const username = useMemo(() => localStorage.getItem('username') || '', []);
    const [participants, setParticipants] = useState<ParticipantsMap>(new Map());
    const [notificationMessage, setNotification] = useState<string | null>(null);
    const socket = useSocketContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        validateToken(token);

        socket.on('participantsUpdate', (receivedParticipants: Participant[]) => {
            console.log("Received participants:", receivedParticipants);

            // Update the participants for the current room (username)
            setParticipants(prevParticipants => {
                const newParticipants = new Map(prevParticipants);
                newParticipants.set(username, receivedParticipants);
                return newParticipants;
            });
        });

        return () => {
            socket.off('participantsUpdate');
            setParticipants(new Map());
        }
    }, [username]);

    const validateToken = async (token: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}validate-token`, { token });
            const validatedUsername = response.data.username;

            if (validatedUsername === username) socket.emit('createRoom', username);
            else throw new Error('Token validation failed');

        } catch (error) {
            console.error('Token validation failed', error);
            setNotification('server error, please try again later');
            navigate('/home')
        }
    };

    const renderParticipants = () => {
        const participantsInRoom = participants.get(username) || [];

        if (participantsInRoom.length === 0) {
            return <p>No participants yet.</p>;
        }

        return (
            <div>
                <h2>Room: {username}</h2>
                <ul>
                    {participantsInRoom.map((participant) => (
                        <li key={participant.socketId}>
                            {participant.username} (Socket ID: {participant.socketId})
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />
            <h1>hostStream</h1>
            {renderParticipants()}
        </div>
    );
}