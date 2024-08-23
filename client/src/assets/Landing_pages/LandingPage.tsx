import { Link } from 'react-router-dom';
import "./LandingPage.css";
import Logo from '../logo/logo';
const LandingPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h2 className="tagline">Synchronize Your Streaming Experience</h2>
        <p className="description">streamSync helps you watch together, no matter where you are.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          <Link to="/login" className="btn btn-secondary">Log In</Link>
        </div>
        <footer>
          <p>&copy; 2024 streamSync. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;