import React, { useState } from "react";
import getKeyPair from "../../../utils/getkeyPair";
import { Connection, Keypair } from "@solana/web3.js";

export default function RequestAirDrop() {

    const [balance, setBalance] = useState(0);

    async function requestAirDrop(e: React.FormEvent) {
        e.preventDefault()
        if (balance < 0) return

        const keyPair: Keypair = getKeyPair();
        try {
            const connection = new Connection(import.meta.env.VITE_RPC_END_POINT, 'confirmed');
            await connection.requestAirdrop(
                keyPair.publicKey, 1000000000);
            setBalance(0)
            console.log('working');
        } catch (error) {
            console.error(error);
        }
    }

    return <div>
        <input type="number" placeholder='Add Request Amount' onChange={(e) => setBalance(Number(e.target.value))} />
        <button onClick={requestAirDrop}>Request Airdrop</button>
    </div>

}