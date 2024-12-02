import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Username from "./pages/auth/Username";
import Home from "./pages/Home";
import Wallet_provider from "@/context/walletContext";
import "./App.css";
import Auth from "./pages/auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import YoutubeAuth from "./pages/auth/YoutubeAuth";
import Setting from "./pages/Setting";
import Host from "./pages/stream/Host";
import CloseTab from "./pages/closeTab";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Wallet_provider>
        <Router>
          <Routes>
            <Route path="/username" element={<Username />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/ytAuth" element={<YoutubeAuth />} />
            <Route path="/host" element={<Host />} />
            <Route path="setting" element={<Setting />} />
            <Route path="completed" element={<CloseTab />} />
          </Routes>
        </Router>
      </Wallet_provider>
    </GoogleOAuthProvider>
  );
};

export default App;
