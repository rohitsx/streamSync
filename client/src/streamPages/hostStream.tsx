import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HostView from "./hostControls";
import AudienceView from "./audienceView";
import { useSocketContext } from "../context/socketContext";

export default function HostStream() {
  const [userRole, setUserRole] = useState<'host' | 'audience' | null>(null);
  const navigate = useNavigate();
  const routerUsername = Object.values(useParams())[0];
  const username = useMemo(() => {
    return localStorage.getItem('username') || '';
  }, [])
  const { socket, participants } = useSocketContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    validateToken(token);
  }, [username]);

  const validateToken = async (token: string) => {
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
  };

  if (userRole === null) return <div>Loading...</div>;

  return (
    <div className={`stream-container ${userRole}`}>
      <div>localName: {username}</div>
      <div className="host">Host: {routerUsername}</div>
      <div>user: {userRole}</div>
      {userRole === 'host' ? <HostView /> : <AudienceView />}
      <h1>{userRole === 'host' ? 'Hosting' : 'Viewing'} Stream: {username}</h1>
      <div>
        <h2>Participants:</h2>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}