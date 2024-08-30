import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NotifcationBox from '../assets/notification/notification';
import { useSocketContext } from '../context/socketContext';

export default function JoinStream() {
    const [username, setUsername] = useState('');
    const [notification, setNotification] = useState<string | null>(null);
    const socket = useSocketContext();
    const navigate = useNavigate();

    const handleJoin = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!socket) {
            setNotification("Connection not established. Please try again.");
            return;
        }

        if (username.length <= 1) {
            setNotification("Username must be longer than 1 character.");
            return;
        }

        socket.emit('joinRoom', username);
    }, [socket, username]);

    useEffect(() => {
        if (!socket) return;

        const handleValidRoom = () => {
            localStorage.setItem('roomId', username);
            navigate('/join-view');
        };

        const handleInvalidRoom = () => {
            setNotification(`Room '${username}' not found. Please try again.`);
            setUsername('');
        };

        socket.on('validRoom', handleValidRoom);
        socket.on('invalidRoom', handleInvalidRoom);

        return () => {
            socket.off('validRoom', handleValidRoom);
            socket.off('invalidRoom', handleInvalidRoom);
        };
    }, [socket, username, navigate]);

    return (
        <div>
            <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
            <form onSubmit={handleJoin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
                <button type="submit">Join Stream</button>
            </form>
        </div>
    );
}