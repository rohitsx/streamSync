import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Logo from '../logo/logo';
import axios from 'axios';
import NotifcationBox from '../notification/notification';
import isLoggedIn from '../../utils/isLoggedIn';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationColor, setNotificationColur] = useState<'blue' | 'red'>('red')
  const navigate = useNavigate();
  isLoggedIn()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}signup`, {
      'name': name,
      'email': email,
      'password': password
    }).then(res => {
      if (res.status === 201) {
        setNotification('Account register, Please login')
        setNotificationColur('blue')
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
      if (res.data === 'email_exists') {
        setNotification('This email is already registered.')
        setNotificationColur('red')
      }
    }).catch(() => {
      setNotification('server error please try again')
      setNotificationColur('red')
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h2>Create your account</h2>
        <NotifcationBox notificationMessage={notification} setNotification={setNotification} color={notificationColor} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="Name"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;