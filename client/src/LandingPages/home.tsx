import './styles/home.css'
import NavBar from '@/components/navBar';
import Header from '@/components/header';
import QuickAction from '@/components/quickAction';
import ActiveStreams from '@/components/activeStreams';
import SolanaWallet from '@/wallet/crypto/soal/solanaWallet';

const HomePage = () => {

  return (
    <div className="bg-gray-900 text-gray-100 h-[600px] w-96 flex flex-col">
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