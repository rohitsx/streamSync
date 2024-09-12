import React, { useCallback, useEffect, useState } from 'react';
import { useSocketContext } from '../../../context/socketContext';
import NotifcationBox from '../../../assets/notification/notification';
import { useNavigate } from 'react-router-dom';
import styles from './styles/soal.module.css'
import getSolConnection from '../../../utils/getSolConnection';
import getKeyPair from '../../../utils/getkeyPair';
import {
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";


export default function SendSoal({ amount, setAmount }: { amount: number, setAmount: (amount: number) => void }) {

    const [message, setMessage] = useState('');
    const socket = useSocketContext()
    const [notificationMessage, setNotification] = useState<string | null>(null)
    const [hostpublicId, setHostPublicId] = useState<string | null>(null);
    const navigate = useNavigate()


    const handeSoalSend = useCallback((e: React.FormEvent) => {
        e.preventDefault();
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
            'message': message, 'soalQuantity': amount, 'roomId': roomId
        });


        setMessage('')
    }, [socket, message, amount]);

    async function soalSend(hostPublicId: string) {
        const connection = getSolConnection();
        const keyPair = getKeyPair()
        const toKeypair = new PublicKey(hostPublicId)

        const transferTransaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keyPair.publicKey,
                toPubkey: toKeypair,
                lamports: 1000000000,
            }),
        );

        console.log('this send solana worked');


        await sendAndConfirmTransaction(connection, transferTransaction, [
            keyPair,
        ]);
    }


    useEffect(() => {
        if (hostpublicId) soalSend(hostpublicId);

        return () => setHostPublicId(null)
    }, [hostpublicId])

    return (
        <div className={styles.soalSenderContainer}>
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
                        <span className={styles.amountDisplay}>{amount.toFixed(1)}</span>
                    </div>
                    <button onClick={handeSoalSend} className={`${styles.btn} ${styles.btnPrimary}`}>
                        Send
                    </button>
                </div>
            </div>
            <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />
        </div>

    );
}