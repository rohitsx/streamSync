import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocketContext } from '../context/socketContext'
import NotifcationBox from '../assets/notification/notification'

export default function JoinStream() {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    const { socket } = useSocketContext()
    const [notificationMessage, setNotification] = useState<string | null>(null);

    const handleJoin = (e: any) => {
        e.preventDefault()
        console.log(socket);

        if (!socket) return

        socket.emit('joinRoom', username)
        socket.on('worngUsername', () => {
            setNotification(`No room with ${username} name, try again`);
            setUsername('');
            return;
        })
        if (username.trim()) {
            navigate(`/host/${username}`)
        }
    }
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