import { useEffect } from "react"

interface ConnectedUserProps {
    username: string | null,
    strangerData: { username: string | null, socketId: string | null }
    view: 'host' | 'audience'
}

export default function ConnectedUser({ username = null, strangerData, view }: ConnectedUserProps) {

useEffect(() => {
    console.log(strangerData);
    
}, [strangerData])
    return <div>
        <div>{username}</div>
        <div>{strangerData.username}</div>
    </div>
}