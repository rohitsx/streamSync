import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo/logo';
import axios from 'axios';
import NotifcationBox from '../assets/notification/notification';
import isLoggedIn from '../utils/isLoggedIn';
import styles from './styles/LandingPage.module.css'

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationColor, setNotificationColur] = useState<'blue' | 'red'>('red');
  const navigate = useNavigate();
  isLoggedIn();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}signup`, {
      'username': username,
      'email': email,
      'password': password
    }).then(res => {
      if (res.status === 201) {
        setNotification('Account registered, Please login');
        setNotificationColur('blue');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      if (res.data === 'email_exists') {
        setNotification('This email is already registered.');
        setNotificationColur('red');
      }
    }).catch(() => {
      setNotification('server error please try again');
      setNotificationColur('red');
    });
  };

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authcard}>
        <Logo />
        <h2>Create your account</h2>
        <NotifcationBox notificationMessage={notification} setNotification={setNotification} color={notificationColor} />
        <form onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={`${styles.btn} ${styles.btnprimary}`}>Sign Up</button>
        </form>
        <p className={styles.authredirect}>
          Already have an account? <Link to="/login" className={styles.link}>Log In</Link>
        </p>
      </div>
    </div>

  );
};

export default SignupPage;