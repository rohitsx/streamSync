import React from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './LandingPages/signupPage';
import LoginPage from './LandingPages/loginPage';
import Home from './LandingPages/home';
import JoinStream from './streamPages/joinStream';
import { SocketProvider } from './context/socketContext';
import AudienceView from './streamPages/view/audienceView';
import HostView from './streamPages/view/hostView';
import Wallet from './wallet/wallet';
import GoLivePage from './streamPages/goLive';
import Wallet_provider from './context/walletContext';
import "./App.css"
import LandingPage from './LandingPages/LandingPage';




const App: React.FC = () => {
  return (
    <SocketProvider>
      <Wallet_provider>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path='/' element={<Home />} />
            <Route path="/join" element={<JoinStream />} />
            <Route path="/join-view" element={<AudienceView />} />
            <Route path="/host" element={<GoLivePage />} />
            <Route path="/host-view" element={<HostView />} />
            <Route path='/wallet' element={<Wallet />} />
          </Routes>
        </Router>
      </Wallet_provider>
    </SocketProvider>
  );
};

export default App;
