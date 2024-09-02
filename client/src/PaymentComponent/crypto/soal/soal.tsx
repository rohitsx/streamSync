import { useCallback, useEffect, useState } from 'react';
import { useSocketContext } from '../../../context/socketContext';
import NotifcationBox from '../../../assets/notification/notification';
import { useNavigate } from 'react-router-dom';
import styles from './soal.module.css'
import getSolConnection from '../../../utils/getSolConnection';
import getKeyPair from '../../../utils/getkeyPair';
import {
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Buffer } from 'buffer';


export default function SendSoal() {
    const [amount, setAmount] = useState(0.00);
    const [message, setMessage] = useState('');
    const socket = useSocketContext()
    const [notificationMessage, setNotification] = useState<string | null>(null)
    const navigate = useNavigate()


    const handeSoalSend = useCallback(() => {
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

        soalSend()

        setMessage('')
    }, [socket, message, amount]);

    async function soalSend() {
        const connection = getSolConnection();
        const keyPair = getKeyPair()
        const toKeypair = new PublicKey('2Avud4f3iSeyMJeNkq35fCT8pKhMD6AahBJpbSHWueKK')

        const transferTransaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keyPair.publicKey,
                toPubkey: toKeypair,
                lamports: amount * 1000000000,
            }),
        );

        console.log('this worked');


        await sendAndConfirmTransaction(connection, transferTransaction, [
            keyPair,
        ]);
    }

    useEffect(() => {
        socket?.on('getUserId', () => {
            //sendSoal()
        })
    }, [socket, amount])

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
                            min="0.0"
                            max="5.0"
                            step="0.1"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className={styles.amountSlider}
                        />
                    </div>
                    <button onClick={handeSoalSend} className={`${styles.btn} ${styles.btnPrimary}`}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}