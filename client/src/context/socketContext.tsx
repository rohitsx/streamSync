// SocketContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    participants: string[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocketContext must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [participants, setParticipants] = useState<string[]>([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username) {
            const newSocket = io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
                transports: ['websocket'],
                auth: { username: username }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        }
    }, [username]);

    useEffect(() => {
        if (!socket) return;

        socket.emit('join', username);

        socket.on('participantsUpdate', (updatedParticipants) => {
            setParticipants(updatedParticipants);
        });

        return () => {
            if (socket) {
                socket.off('participantsUpdate');
            }
        };
    }, [socket, username]);

    return (
        <SocketContext.Provider value={{ socket, participants }}>
            {children}
        </SocketContext.Provider>
    );
};
