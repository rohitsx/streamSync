import Header from "@/components/header";
import NavBar from "@/components/navBar";
import SolanaWallet from "./crypto/soal/solanaWallet";
import RecentTransaction from "./recentTransaction";
import isLoggedIn from "@/utils/isLoggedIn";

export default function Wallet() {
    isLoggedIn();

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