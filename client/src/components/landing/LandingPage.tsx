import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo";
import Layout from "./Layout";

function LandingPage() {
  const nav = useNavigate();

  const openNewTab = (route: string) => {
    try {
      chrome.tabs.create({
        url: chrome.runtime.getURL(`index.html#${route}`), // Use hash for routing
      });
    } catch {
      console.error("Failed to create tab. Navigating to fallback route.");
      nav(route);
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center space-y-2">
        <Logo />
        <h2 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Elevate Your Stream Experience
        </h2>
      </div>

      <div className="w-full flex flex-col max-w-xs p-6 space-y-4 ">
        <button
          onClick={() => openNewTab("/signup")}
          className="text-sm py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 text-center"
        >
          Sign Up
        </button>
        <button
          onClick={() => openNewTab("/login")}
          className="text-sm py-2 px-4 bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold rounded-lg transition duration-300 text-center"
        >
          Log In
        </button>
      </div>
    </Layout>
  );
}

export default LandingPage;
