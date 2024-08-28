import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocketContext } from '../context/socketContext'
import NotifcationBox from '../assets/notification/notification'

export default function JoinStream() {
    const [username, setUsername] = useState('')
    const [notificationMessage, setNotification] = useState<string | null>(null);
    const socket = useSocketContext()
    const navigate = useNavigate()

    const handleJoin = async (e: any) => {
        e.preventDefault()
        if (!socket) return

        socket.emit('joinRoom', username)
        socket.on('inValidRoom', () => {
            setNotification(`Room '${username}' not found. Please try again.`);
            setUsername('');
            return
        })
        socket.on('validRoom', () => navigate(`/join/${username}`))
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