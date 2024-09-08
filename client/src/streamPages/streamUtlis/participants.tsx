import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import Users from "./users";
import getKeyPair from "../../utils/getkeyPair";


export default function HandelParticipant({ getUsername = false }: { getUsername?: boolean }) {
    const [users, setUsers] = useState<{ value: string, score: number }[] | undefined>();
    const socket = useSocketContext();

    useEffect(() => {
        if (socket) {
            socket.on('participantsUpdate', handleParticipantsUpdate);

            return () => {
                socket.off('participantsUpdate');
            };
        }
    }, [socket]);

    const handleParticipantsUpdate = (data: { value: string, score: number }[]) => {
        setUsers(data)
    };

    function handleGetUser(username: string) {
        if (!getUsername) return;
        const keyPair = getKeyPair()
        
        if (socket) socket.emit('getSocketId', { username: username, publickey: keyPair.publicKey.toString() });
        else console.log('Can\'t share the socket id; socket not working');
    }

    if (users?.length === 0) {
        return <p>No participants yet.</p>;
    }


    return (
        <Users
            users={users}
            handleGetUser={handleGetUser}
        />
    );
}