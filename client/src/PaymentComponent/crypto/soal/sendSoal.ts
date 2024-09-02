import getSolConnection from '../../../utils/getSolConnection';
import getKeyPair from '../../../utils/getkeyPair';
import {
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

export default async function soalSend(hostPublicId: string, amount: number) {
    console.log(amount);
    
    const connection = getSolConnection();
    const keyPair = getKeyPair()
    const toKeypair = new PublicKey(hostPublicId)

    const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: keyPair.publicKey,
            toPubkey: toKeypair,
            lamports: amount * 1000000000,
        }),
    );

    console.log('this send solana worked');


    await sendAndConfirmTransaction(connection, transferTransaction, [
        keyPair,
    ]);
}