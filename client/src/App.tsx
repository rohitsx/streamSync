import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './assets/Landing_pages/LandingPage';
import SignupPage from './assets/Landing_pages/signupPage';
import LoginPage from './assets/Landing_pages/loginPage';
import Home from './assets/home/home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
