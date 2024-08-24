import { useEffect } from "react";
import "./notification.css";

interface NotifcationBoxProps {
  notificationMessage: string | null;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  color?: 'red' | 'blue'; 
}

export default function NotifcationBox({ notificationMessage, setNotification, color = 'red' }: NotifcationBoxProps) {

    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => clearTimeout(timer); 
        }
    }, [notificationMessage, setNotification]);

    if (!notificationMessage) return null;

    return (
        <div className={`notification-box ${color}`}>
            <p>{notificationMessage}</p>
        </div>
    );
}
