import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./landing/SignupPage";
import LoginPage from "./landing/LoginPage";
import Home from "./landing/Home";
import JoinStream from "./stream/JoinStream";
import AudienceView from "./stream/view/audienceView";
import HostView from "./stream/view/hostView";
import Wallet from "./wallet/Wallet";
import GoLivePage from "./stream/GoLive";
import Wallet_provider from "@/context/walletContext";
import "./App.css";
import LandingPage from "./landing/LandingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Wallet_provider>
          <Router>
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<JoinStream />} />
              <Route path="/host" element={<GoLivePage />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/join-view" element={<AudienceView />} />
              <Route path="/host-view" element={<HostView />} />
            </Routes>
          </Router>
        </Wallet_provider>
    </GoogleOAuthProvider>
  );
};

export default App;
