import Header from "@/components/layout/Header";
import QuickAction from "@/components/layout/QuickAction";
import ActiveStreams from "@/components/stream/ActiveStreams";
import Layout from "./Layout";
import useAuthRedirect from "@/hook/useAuthRedirect";

const HomePage = () => {
  useAuthRedirect();

  return (
    <Layout>
      <main className="flex-1 overflow-y-auto w-full p-2 space-y-3 scrollbar-hide">
        <Header />
        <QuickAction />
        <ActiveStreams />
      </main>
    </Layout>
  );
};

export default HomePage;
