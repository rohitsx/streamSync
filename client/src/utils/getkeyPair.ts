import { Keypair } from "@solana/web3.js";


export default function getKeyPair() {

    const privateKeyString = localStorage.getItem('walletPrivateKey');
    if (!privateKeyString) {
        throw new Error("No private key found in localStorage");
    }

    const privateKeyArray = JSON.parse(privateKeyString) as number[];
    const privateKeyUint8Array = Uint8Array.from(privateKeyArray);

    // Recreate the Keypair from the private key
    const keypair = Keypair.fromSecretKey(privateKeyUint8Array);
    return keypair
}