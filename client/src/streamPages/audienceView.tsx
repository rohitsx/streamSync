import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import HandelParticipant from "./streamUtlis/participants";
import { useNavigate, useParams } from "react-router-dom";
import useDefaultPage from "../hook/useDefaultPage";

export default function AudienceView() {
    const socket = useSocketContext();
    const hostName = Object.values(useParams())[0]
    const [updateDefaultPage] = useDefaultPage()
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('defaultPage', 'audience')
        if (!hostName) {
            navigate(`/join/${localStorage.getItem('hostname')}`)
            return
        }
        if (socket && hostName) {
            console.log('send request', hostName);

            socket.emit('getUsers', hostName)

            return () => {
                socket.off('getUsers')
            }
        }
    }, [socket, hostName])

    function changePage() {
        socket && socket.emit('leaveRoom')
        updateDefaultPage('home')
        navigate('/home')
    }
    return <div>
        <button onClick={changePage}>Go back</button>
        <h1>AudienceView</h1>
        <HandelParticipant />
    </div>
}