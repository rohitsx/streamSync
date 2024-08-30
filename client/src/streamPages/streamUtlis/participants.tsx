import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import { useNavigate } from "react-router-dom";

export default function HandelParticipant({ getUsername = false }: { getUsername?: true | false }) {
    const [participants, setParticipants] = useState<string[] | []>([]);
    const socket = useSocketContext();
    const navigator = useNavigate()


    useEffect(() => {
        if (socket) {
            socket.on('participantsUpdate', handleParticipantsUpdate);

            return () => {
                socket.off('participantsUpdate');
            }
        }
    }, [socket]);

    const handleParticipantsUpdate = (receivedParticipants: string[]) => {
        console.log('recvide participant', receivedParticipants);
        setParticipants(receivedParticipants);
        if (receivedParticipants.length === 0 && !getUsername) {
            console.log(participants.length, participants);

            localStorage.setItem('defaultPage', 'home')
            navigator('/home')
        }
    };

    useEffect(() => {

    }, [participants])
    if (participants.length === 0) {
        return <p>No participants yet.</p>;
    }


    function handelgetuser(username: string) {

        if (!getUsername) return
        if (socket) socket.emit('getSocketId', username)
        else console.log('can"t share the socket id socket not working');
    }

    return (
        <div>
            <ul>
                {participants.map((username, index) => (
                    <li key={index} onClick={() => handelgetuser(username)}>
                        {username}
                    </li>
                ))}
            </ul>
        </div>
    );
}
