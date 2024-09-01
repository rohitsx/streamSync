import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import SuperChat from "./superChat";

type ParticipantMessage = {
    username: string;
    message: string;
    soalQuantity: number;
};

export default function HandelParticipant({ getUsername = false }: { getUsername?: boolean }) {
    const [users, setusers] = useState<Set<string>>(new Set());
    const [premiumUsers, setPremiumUsers] = useState<Map<string, ParticipantMessage>>(new Map())
    const socket = useSocketContext();



    useEffect(() => {
        if (socket) {
            socket.on('participantsUpdate', handleParticipantsUpdate);
            socket.on('participantsUpdateMessage', handleParticipantMessage);

            return () => {
                socket.off('participantsUpdate');
                socket.off('participantsUpdateMessage');
            };
        }
    }, [socket]);

    const handleParticipantsUpdate = (receivedUsers: string[]) => {
        console.log('recived user', receivedUsers);
        const userSet = new Set(receivedUsers)
        setusers(userSet);
    };

    const handleParticipantMessage = (receivedPreimumUser: ParticipantMessage) => {
        console.log('Received participantMessage', receivedPreimumUser);
        setPremiumUsers(prevMessages => {
            const updatedMessages = new Map<string, ParticipantMessage>(prevMessages);
            updatedMessages.set(receivedPreimumUser.username, receivedPreimumUser);
            return updatedMessages;
        })

        setusers(users => {
            const updatedUser = users;
            updatedUser.delete(receivedPreimumUser.username);
            return updatedUser
        })

    };

    function handelgetuser(username: string) {
        if (!getUsername) return;
        if (socket) socket.emit('getSocketId', username);
        else console.log('Can\'t share the socket id; socket not working');
    }

    if (users.size === 0) {
        return <p>No participants yet.</p>;
    }

    return (
        <SuperChat
            premiumUsers={premiumUsers}
            users={users}
            handelgetuser={handelgetuser}
        />
    );

}
