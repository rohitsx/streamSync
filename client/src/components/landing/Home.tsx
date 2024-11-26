import NavBar from "@/components/layout/NavBar";
import Header from "@/components/layout/Header";
import QuickAction from "@/components/layout/QuickAction";
import ActiveStreams from "@/components/stream/ActiveStreams";
import SolanaWallet from "@/components/wallet/crypto/soal/solanaWallet";
import Layout from "./Layout";
import useAuthRedirect from "@/hook/useAuthRedirect";

const HomePage = () => {
	useAuthRedirect();

  return (
    <Layout>
      <Header />
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <QuickAction />
        <SolanaWallet />
        <ActiveStreams />
      </main>
      <NavBar />
    </Layout>
  );
};

export default HomePage;
