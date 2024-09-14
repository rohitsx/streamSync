import React, { useState } from "react";
import getKeyPair from "../../../utils/getkeyPair";
import { Connection, Keypair } from "@solana/web3.js";
import styles from './styles/requestAirDrop.module.css'
import NotifcationBox from "../../../assets/notification/notification";

export default function RequestAirDrop() {

    const [balance, setBalance] = useState(0);
    const [notificationMessage, setNotification] = useState<string | null>(null)

    async function requestAirDrop(e: React.FormEvent) {
        e.preventDefault()
        if (balance < 0) return

        const keyPair: Keypair = getKeyPair();
        try {
            const connection = new Connection(import.meta.env.VITE_RPC_END_POINT, 'confirmed');
            await connection.requestAirdrop(
                keyPair.publicKey, balance * 1000000000);
            setBalance(0)
            setNotification('Request airdrop success. Please wait for 5-10min to get balance updated.')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.amountSliderContainer}>
                <div className={styles.sliderValue}>
                    {balance.toFixed(1)} SOL
                </div>
                <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.1"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className={styles.amountSlider}
                />
            </div>
            <NotifcationBox notificationMessage={notificationMessage} setNotification={setNotification} />
            <button className={`${styles.button} ${styles.btnAirdrop}`} onClick={requestAirDrop}>
                Request Airdrop
            </button>
        </div>
    );

}