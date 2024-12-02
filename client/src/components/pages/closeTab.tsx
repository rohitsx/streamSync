import Layout from "../layout/Layout";
import animeGif from "@/assets/anime.gif";

export default function CloseTab() {
  return (
    <Layout>
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center w-full items-center ">
          <img
            src={animeGif}
            alt="Success Animation"
            className="mb-4 w-full max-w-[320px] rounded-xl object-cover"
          />
          <div className="text-center text-l font-light text-white/85 text-shadow-md tracking-wide">
            <strong className="font-semibold text-white mb-2">
              {" "}
              You're all set!
            </strong>{" "}
            Close this tab and try once more.
          </div>
        </div>
      </div>
    </Layout>
  );
}
