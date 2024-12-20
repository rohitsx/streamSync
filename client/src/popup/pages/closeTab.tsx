import Layout from "@/layout/Layout";
import animeGif from "@/assets/anime.gif";

export default function CloseTab() {
  return (
    <Layout>
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <img
          src={animeGif}
          alt="Success Animation"
          className="mb-6 w-full max-w-[320px] rounded-xl object-cover"
        />
        <div className="text-center text-l md:text-xl font-medium text-white/90 text-shadow-md tracking-wide space-y-2">
          <strong className="block font-bold text-white  text-xl ">
            You're all set!
          </strong>
          <p className="text-lg md:text-l">Close this tab.</p>
        </div>
      </div>
    </Layout>
  );
}
