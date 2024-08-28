import axios from "axios";
import { Socket } from "socket.io-client";


export default async function validateToken(
    token: string,
    username: string,
    routerUsername: string ,
    setUserRole: (role: 'host' | 'audience') => void,
    socket: Socket | null) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}validate-token`, { token });
        const validatedUsername = response.data.username;

        if (validatedUsername && username === routerUsername) {
            setUserRole('host');
            socket && socket.emit('setAsHost', username);

        } else {
            setUserRole('audience');
            socket && socket.emit('setAsAudience', username);
        }
    } catch (error) {
        console.error('Token validation failed', error);
        setUserRole('audience');
        socket && socket.emit('setAsAudience', username);
    }
} 