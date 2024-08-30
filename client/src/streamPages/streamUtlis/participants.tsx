import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";

interface handleParticipantsProps {
    getUsername?: boolean | null;
    setStrangerData?: (data: any) => void;
    strangerData?: {
        username: string | null,
        socketId: string | null
    }
}

export default function HandelParticipant({ getUsername = null, setStrangerData = () => { }, strangerData }: handleParticipantsProps) {
    const [participants, setParticipants] = useState<[string] | []>([]);
    const socket = useSocketContext();


    useEffect(() => {
        if (socket) {
            socket.on('participantsUpdate', handleParticipantsUpdate);

            return () => {
                socket.off('participantsUpdate');
            }
        }
    }, [socket]);

    const handleParticipantsUpdate = (receivedParticipants: [string]) => {
        console.log('recvide participant', receivedParticipants);

        setParticipants(receivedParticipants);
    };

    if (participants.length === 0) {
        return <p>No participants yet.</p>;
    }

    function handelgetuser(username: string) {

        if (!getUsername) return
        if (socket) {
            console.log('parciapent getUser working');
            console.log();
            
            setStrangerData({ username: username, socketId: strangerData?.socketId })
            socket.emit('getSocketId', username)
        }
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
