import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NotifcationBox from '../assets/notification/notification';
import { useSocketContext } from '../context/socketContext';
import styles from './style/joinStream.module.css';

export default function JoinStream() {
    const [username, setUsername] = useState('');
    const [notification, setNotification] = useState<string | null>(null);
    const socket = useSocketContext();
    const navigate = useNavigate();

    const handleJoin = useCallback(() => {
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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleJoin();
        }
    };

    return (
        <div className={styles.joinstream}>
            <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
            <div className={styles.joinform}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyPress} 
                    placeholder="Enter username"
                    className={styles.joininput}
                />
                <button type="button" onClick={handleJoin} className={`${styles.btn} ${styles.btnprimary}`}>
                    Send Request
                </button>
            </div>
        </div>
    );
}
