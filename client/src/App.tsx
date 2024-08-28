import React, { useMemo } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPages/LandingPage';
import SignupPage from './LandingPages/signupPage';
import LoginPage from './LandingPages/loginPage';
import Home from './LandingPages/home';
import HostStream from './streamPages/hostStream';
import "./App.css"
import JoinStream from './streamPages/joinStream';

const App: React.FC = () => {

  const defaultPage = useMemo(() => {
    const name = localStorage.getItem('name');
    return name ? <Home /> : <LandingPage />;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={defaultPage} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path={"/host/:username"} element={<HostStream />} />
        <Route path={"/join_stream"} element={<JoinStream />} />
      </Routes>
    </Router>
  );
};

export default App;
