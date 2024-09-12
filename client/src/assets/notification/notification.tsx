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

    }, [notificationMessage]);

    if (!notificationMessage) return null;

    return (
        <>
            {notificationMessage && (
                <div className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 rounded`} role="alert">
                    <p>{notificationMessage}</p>
                </div>
            )}
        </>
    );
}
