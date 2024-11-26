import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import SolanaWallet from "./crypto/soal/solanaWallet";
import RecentTransaction from "./RecentTransaction";

export default function Wallet() {

    return (<>
        <div className="bg-gray-900 text-gray-100 h-[600px] w-[380px] flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                <SolanaWallet />
                <RecentTransaction />
            </main>
            <NavBar />
        </div>
    </>);
}
