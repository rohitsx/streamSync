import { useEffect, useState } from 'react';
import { Keypair } from '@solana/web3.js';
import getSoalBalance from '../../../utils/getSoalBalance';
import styles from './styles/createWallet.module.css'

export default function CreateSoalWallet() {

    const [balance, setBalance] = useState<number>(0);

    async function createWallet() {
        const keypair = Keypair.generate();
        const pubKey = keypair.publicKey.toBase58();

        // Store the private key in localStorage as a JSON string
        localStorage.setItem('walletPrivateKey', JSON.stringify(Array.from(keypair.secretKey)));

        // Store the public key in localStorage
        localStorage.setItem('walletKey', pubKey);

        window.location.reload();
    }

    useEffect(() => {
        if (localStorage.getItem('walletKey')) {
            getSoalBalance().then(balanceInstace => setBalance(balanceInstace));
        }
    })

    return (
        <div className={styles.container}>
            {localStorage.getItem('walletKey') ? (
                <div className={styles.balance}>
                    $ {balance === 0 ? '0.00' : balance}0
                </div>
            ) : (
                <button className={styles.button} onClick={createWallet}>
                    Create SOL Wallet
                </button>
            )}
        </div>
    );
}
