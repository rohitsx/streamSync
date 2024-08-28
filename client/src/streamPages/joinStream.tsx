import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function JoinStream() {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const handleJoin = () => {
        if (username.trim()) {
            navigate(`/host/${username}`)
        }
    }

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button onClick={handleJoin}>Join Stream</button>
        </div>
    )
}