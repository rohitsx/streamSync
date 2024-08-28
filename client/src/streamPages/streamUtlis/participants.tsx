import { useEffect, useState, useMemo } from "react";
import { useSocketContext } from "../../context/socketContext";
import { useParams } from "react-router-dom";

interface Participant {
    socketId: string;
    username: string;
}

export default function HandelParticipant() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const socket = useSocketContext();
    const hostName = Object.values(useParams())[0]

    useEffect(() => {
        if (socket) {
            socket.on('participantsUpdate', handleParticipantsUpdate);

            return () => {
                socket.off('participantsUpdate');
            }
        }
    }, [socket]);

    const handleParticipantsUpdate = (receivedParticipants: Participant[]) => {
        setParticipants(receivedParticipants);
        console.log('working');
        
    };

    if (participants.length === 0) {
        return <p>No participants yet.</p>;
    }

    return (
        <div>
            <h2>Room: {hostName}</h2>
            <ul>
                {participants.map((participant) => (
                    <li key={participant.socketId}>
                        {participant.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}
