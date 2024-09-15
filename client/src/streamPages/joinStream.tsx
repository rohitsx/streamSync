import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import NotifcationBox from '../assets/notification/notification';
import { useSocketContext } from '../context/socketContext';
import Header from '@/components/header';
import NavBar from '@/components/navBar';
import ActiveStreams from '@/components/activeStreams';


export default function JoinStream() {
    const [username, setUsername] = useState('');
    const [notification, setNotification] = useState<string | null>(null);
    const socket = useSocketContext();
    const navigate = useNavigate();

    console.log(notification);


    const handleJoin = useCallback(() => {
        if (!socket) {
            setNotification("Connection not established. Please try again.");
            return;
        }

        if (username.length <= 1) {
            setNotification("Username must be longer than 1 character.");
            return;
        }

        socket.emit('checkRoom', username);
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
        <div className="flex flex-col h-[600px] w-[23rem] bg-gray-900 text-white">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                <section className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-purple-300">Join Stream</h2>
                            <p className="text-xs text-gray-400">Enter stream code to join</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter username"
                            className="w-full bg-gray-700 text-white placeholder-gray-500 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                        />
                        <button
                            onClick={handleJoin}
                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:from-purple-600 hover:to-indigo-600 transition-colors duration-300 flex items-center justify-center"
                        >
                            Join Stream
                        </button>
                    </div>
                </section>
                <ActiveStreams />
            </main>
                <NavBar />
        </div>

    );
}
