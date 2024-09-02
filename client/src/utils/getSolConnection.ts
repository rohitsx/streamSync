import { Connection } from "@solana/web3.js";

export default function getSolConnection() {
    const connection = new Connection(import.meta.env.VITE_RPC_END_POINT);
    return connection
}