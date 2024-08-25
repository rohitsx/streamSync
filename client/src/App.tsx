import React, { useMemo} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './assets/Landing_pages/LandingPage';
import SignupPage from './assets/Landing_pages/signupPage';
import LoginPage from './assets/Landing_pages/loginPage';
import Home from './assets/home/home';
import "./App.css"

const App: React.FC = () => {

  const DefaultPage = useMemo(() => {
    const name = localStorage.getItem('name');
    return name ? <Home /> : <LandingPage />;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={DefaultPage} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
