import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function useSocket(username:string) {
    const [socket, setSocket] = useState<null | object>(null)
    useEffect(() => {
        if (username) {
            const newSocket = io(import.meta.env.VITE_APP_WEBSOCKET_URL, {
                transports: ['websocket'],
                auth: { username: username }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect()
                setSocket(null)
            }
        }
    }, [])

    return socket;
}