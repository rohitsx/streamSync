import React, { useMemo } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPages/LandingPage';
import SignupPage from './LandingPages/signupPage';
import LoginPage from './LandingPages/loginPage';
import Home from './LandingPages/home';
// import HostStream from './streamPages/hostStream';
import "./App.css"
import JoinStream from './streamPages/joinStream';
import { SocketProvider } from './context/socketContext';
import AudienceView from './streamPages/audienceView';
import HostView from './streamPages/hostView';

const App: React.FC = () => {
  const defaultPage = useMemo(() => {
    const name = localStorage.getItem('username');
    return name ? <Home /> : <LandingPage />;
  }, []);

  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={defaultPage} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/host/:username" element={<HostView />} />
          <Route path="/join" element={<JoinStream />} />
          <Route path="/join/:username" element={<AudienceView />} />
          {/* <Route path="/host-view" element={<HostView />} /> */}
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;