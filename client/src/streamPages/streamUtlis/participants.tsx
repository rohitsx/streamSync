import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import Users from "./users";
import getKeyPair from "../../utils/getkeyPair";

type PremiumUserProp = {
    message: string;
    soalQuantity: number;
};

type PrimeUsersType = {
    [username: string]: PremiumUserProp;
};

export default function HandelParticipant({ getUsername = false }: { getUsername?: boolean }) {
    const [users, setUsers] = useState<Set<string>>(new Set());
    const [primeUsers, setPrimeUsers] = useState<PrimeUsersType>({});
    const socket = useSocketContext();

    useEffect(() => {
        if (socket) {
            const roomId = localStorage.getItem('roomId');
            socket.emit('getUsers', roomId);
            socket.on('participantsUpdate', handleParticipantsUpdate);
            socket.on('primeUserUpdate', handlePrimeUserUpdate);

            return () => {
                socket.off('participantsUpdate');
                socket.off('primeUserUpdate');
            };
        }
    }, [socket]);

    const handleParticipantsUpdate = (receivedUsers: string[]) => {
        console.log('received users', receivedUsers);
        setUsers(new Set(receivedUsers));
    };

    const handlePrimeUserUpdate = (receivedPrimeUsers: PrimeUsersType) => {
        console.log('received prime users', receivedPrimeUsers);
        setPrimeUsers(receivedPrimeUsers);
    };

    function handleGetUser(username: string) {
        if (!getUsername) return;
        const keyPair = getKeyPair()
        console.log('share socket id', keyPair.publicKey.toString());

        if (socket) socket.emit('getSocketId', { username: username, publickey: keyPair.publicKey.toString() });
        else console.log('Can\'t share the socket id; socket not working');
    }

    if (users.size === 0 && Object.keys(primeUsers).length === 0) {
        return <p>No participants yet.</p>;
    }

    return (
        <Users
            primeUsers={primeUsers}
            users={users}
            handleGetUser={handleGetUser}
        />
    );
}