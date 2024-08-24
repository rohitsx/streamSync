import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Logo from '../logo/logo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifcationBox from '../notification/notification';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}login`, {
      "email": email,
      "password": password
    }).then(res => {      
      if (res.data == 'success_login') {
        navigate('/home');
      }
      if (res.data == 'wrong_id_pass') setNotification('Incorrect username or password. If you are not a user, visit the signup page.')
    }).catch(() => setNotification('server error please try again'))  
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h2>Welcome back</h2>
        <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;