import React, { useEffect, useState } from 'react';
import { Keypair } from '@solana/web3.js';
import getSoalBalance from '../../../utils/getSoalBalance';

export default function CreateSoalWallet() {

    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<number>(0);

    async function createWallet(e: React.FormEvent) {
        e.preventDefault();


        const keypair = Keypair.generate();
        const pubKey = keypair.publicKey.toBase58();
        setPublicKey(pubKey);

        // Store the private key in localStorage as a JSON string
        localStorage.setItem('walletPrivateKey', JSON.stringify(Array.from(keypair.secretKey)));

        // Store the public key in localStorage
        localStorage.setItem('walletKey', pubKey);

        // Fetch the balance
        const balance = await getSoalBalance();
        setBalance(balance);
    }

    useEffect(() => {
        if (localStorage.getItem('walletKey')) {
            getSoalBalance().then(balanceInstace => setBalance(balanceInstace));
        }
    })

    return (
        <div>
            {localStorage.getItem('walletKey') ? (
                <div>
                    <div>$ {balance} SOL</div>
                </div>
            ) : (
                <button onClick={createWallet}>
                    Create SOL Wallet
                </button>
            )}
        </div>
    );
}
