import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import { useParams } from "react-router-dom";


export default function HandelParticipant() {
    const [participants, setParticipants] = useState<[string] | []>([]);
    const socket = useSocketContext();
    const hostName = Object.values(useParams())[0]

    useEffect(() => {
        if (socket) {
            socket.on('participantsUpdate', handleParticipantsUpdate);
            console.log('socket created');
            
            return () => {
                socket.off('participantsUpdate');
            }
        }
    }, [socket]);

    const handleParticipantsUpdate = (receivedParticipants: [string]) => {
        console.log(receivedParticipants);

        setParticipants(receivedParticipants);
        console.log('working', participants);

    };

    if (participants.length === 0) {
        return <p>No participants yet.</p>;
    }

    return (
        <div>
            <h2>Room: {hostName}</h2>
            <ul>
                {participants.map((username, index) => (
                    <li key={index}>
                        {username}
                    </li>
                ))}
            </ul>
        </div>
    );
}
