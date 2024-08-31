import { Link } from 'react-router-dom';
import stlyes from "./styles/LandingPage.module.css";
import Logo from '../assets/logo/logo';
import isLoggedIn from '../utils/isLoggedIn';

function LandingPage() {
  isLoggedIn()

  return (
    <div className={stlyes.authcontainer}>
      <div className={stlyes.authcard}>
        <Logo />
        <h2 className={stlyes.tagline}>Seamlessly Connect with Your Favorite People</h2>
        {/* <p className="description">streamSync helps you watch together, no matter where you are.</p> */}
        <div className={stlyes.ctabuttons}>
          <Link to="/signup" className={`${stlyes.btn} ${stlyes.btnprimary}`}>Sign Up</Link>
          <Link to="/login" className={`${stlyes.btn} ${stlyes.btnsecondary}`}>Log In</Link>
        </div>
        <footer>
          <p>&copy; 2024 streamSync. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;