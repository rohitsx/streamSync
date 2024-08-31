import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function HostStream() {
  const username = useMemo(() => { localStorage.getItem('username') || '' }, []);
  const navigate = useNavigate()
  return <div>
    <h1>Setup Stream</h1>
    <button onClick={() => navigate('/host/' + username)}>Save Setting</button>
  </div>

}