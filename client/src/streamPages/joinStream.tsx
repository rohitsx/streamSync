import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotifcationBox from '../assets/notification/notification'
import { useSocketContext } from '../context/socketContext';

export default function JoinStream() {
    const [username, setUsername] = useState('')
    const [notificationMessage, setNotification] = useState<string | null>(null);
    const socket = useSocketContext();
    const navigate = useNavigate();

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!socket) {
            setNotification("Connection not established. Please try again.");
            return;
        }

        if (username.length > 1) {
            socket.emit('joinRoom', username)
            localStorage.setItem('hostname', username)
        } else {
            setNotification("Username must be longer than 1 character.");
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('inValidRoom', () => {
                setNotification(`Room '${username}' not found. Please try again.`);
                setUsername('');
            });
            socket.on('validRoom', () => navigate(`/join/${username}`));

            return () => {
                socket.off("validRoom");
                socket.off("invalidRoom");
            }
        }
    }, [socket, username]);



    return (
        <div>
            <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />

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
    )
}