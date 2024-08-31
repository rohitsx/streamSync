import React from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './LandingPages/signupPage';
import LoginPage from './LandingPages/loginPage';
import Home from './LandingPages/home';
// import HostStream from './streamPages/hostStream';
import "./App.css"
import JoinStream from './streamPages/joinStream';
import { SocketProvider } from './context/socketContext';
import AudienceView from './streamPages/view/audienceView';
import HostView from './streamPages/view/hostView';
import useDefaultPage from './hook/useDefaultPage';



const App: React.FC = () => {
  const [, defaultPage] = useDefaultPage();
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path='/' element={defaultPage} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/host/:username" element={<HostView />} /> */}
          <Route path="/join" element={<JoinStream />} />
          <Route path="/join-view" element={<AudienceView />} />
          <Route path="/host-view" element={<HostView />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;