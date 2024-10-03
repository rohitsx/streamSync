import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo";

function LandingPage() {
  const nav = useNavigate();

  const openNewTab = (route: string) => {
    // const extensionId = chrome.runtime.id;
    // const url = `chrome-extension://${extensionId}/${route}`;
    // chrome.runtime.sendMessage({ action: "openNewTab", url });
    nav("/"+ route);
    
  };

  return (
    <div className="w-[380px] h-[500px] bg-gradient-to-br from-purple-950 to-gray-950 text-white flex flex-col items-center justify-between p-6">
      <div className="w-full flex flex-col items-center space-y-2">
        <Logo />
        <h2 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Elevate Your Stream Experience
        </h2>
      </div>

      <div className="w-full max-w-xs bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-6 space-y-6">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => openNewTab("signup")}
            className="text-sm py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 text-center"
          >
            Sign Up
          </button>
          <button
            onClick={() => openNewTab("login")}
            className="text-sm py-2 px-4 bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-semibold rounded-lg transition duration-300 text-center"
          >
            Log In
          </button>
        </div>
      </div>

      {/* <footer className="text-center text-xs text-gray-400">
        <p>&copy; 2024 StreamSync. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default LandingPage;
