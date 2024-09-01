import { useCallback, useState } from 'react';
import { useSocketContext } from '../../context/socketContext';
import NotifcationBox from '../../assets/notification/notification';
import { useNavigate } from 'react-router-dom';
import styles from './soal.module.css'


export default function SendSoal() {
    const [amount, setAmount] = useState(40.00);
    const [message, setMessage] = useState('');
    const socket = useSocketContext()
    const [notificationMessage, setNotification] = useState<string | null>(null)
    const navigate = useNavigate()


    const sendSoal = useCallback(() => {
        if (!socket) {
            setNotification("Connection not established. Please try again.");
            return;
        }

        const roomId = localStorage.getItem('roomId');
        if (!roomId) {
            setNotification('Internal error, Soal not send. please rejoin.');
            setTimeout(() => {
                navigate('/home')
            }, 6000)
            return;
        }

        socket.emit('soalStreamRequest', {
            'soal': {
                'message': message, 'soalQuantity': amount, 'roomId': roomId
            }
        });

        setMessage('')
    }, [socket, message, amount]);

    return (
        <div className={styles.soalSenderContainer}>
            <NotifcationBox
                notificationMessage={notificationMessage}
                setNotification={setNotification}
            />
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Add your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.messageInput}
                />
                <div className={styles.inputAndBtn}>
                    <div className={styles.amountControl}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={styles.amountSlider}
                        />
                    </div>
                    <button onClick={sendSoal} className={`${styles.btn} ${styles.btnPrimary}`}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}