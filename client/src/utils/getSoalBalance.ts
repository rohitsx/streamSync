import getKeyPair from "./getkeyPair";
import getSolConnection from "./getSolConnection";

export default async function getSoalBalance() {
    const connection = getSolConnection();   //"https://api.devnet.solana.com", "confirmed"

    const keypair = getKeyPair()

    // Fetch the balance
    const lamports = await connection.getBalance(keypair.publicKey);
    const solBalance = lamports / 1_000_000_000;

    return solBalance;
}
