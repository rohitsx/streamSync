import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useSocket from "../hooks/useSocket";


export default function HostStream() {
  const [userRole, setUserRole] = useState<'host' | 'audience' | null>(null);
  const navigate = useNavigate();
  const routerUsername = Object.values(useParams())[0];
  const username = useMemo(() => {
    return localStorage.getItem('username') || '';
  }, [])
  const socket = useSocket(username);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) validateToken(token);
    else navigate('/login');
  }, [username]);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}validate-token`, { token });
      const validatedUsername = response.data.username;

      if (validatedUsername && username === routerUsername) setUserRole('host');
      else setUserRole('audience');
    } catch (error) {
      console.error('Token validation failed', error);
    }
  };

  if (userRole === null) return <div>Loading...</div>;

  return (
    <div className={`stream-container ${userRole}`}>
      <div>localName: {username}</div>
      <div className="host">Host: {routerUsername}</div>
      <div>user: {userRole}</div>
      {userRole === 'host' ? <HostControls /> : <AudienceView />}
    </div>
  );
}