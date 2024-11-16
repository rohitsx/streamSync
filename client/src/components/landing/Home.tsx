import NavBar from "@/components/layout/NavBar";
import Header from "@/components/layout/Header";
import QuickAction from "@/components/layout/QuickAction";
import ActiveStreams from "@/components/stream/ActiveStreams";
import SolanaWallet from "@/components/wallet/crypto/soal/solanaWallet";
import isLoggedIn from "@/utils/isLoggedIn";

const HomePage = () => {
  isLoggedIn();

  return (
    <div className="bg-gray-900 text-gray-100 h-[600px] w-[380px] flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <QuickAction />
        <SolanaWallet />
        <ActiveStreams />
      </main>
      <NavBar />
    </div>
  );
};

export default HomePage;
