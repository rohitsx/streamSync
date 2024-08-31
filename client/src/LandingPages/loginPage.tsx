import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NotifcationBox from '../assets/notification/notification';
import isLoggedIn from '../utils/isLoggedIn';
import styles from './styles/LandingPage.module.css'
import Logo from '../assets/logo/logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<string | null>(null)
  isLoggedIn()


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}login`, {
      "email": email,
      "password": password
    }).then(res => {
      if (res.data.message === 'success_login') {
        localStorage.setItem('token', res.data.token);
        console.log(res.data);

        localStorage.setItem('username', res.data.username);
        console.log("username from login page", localStorage.getItem('username'));

        window.location.reload();
      }

      if (res.data === 'incorrect_email') setNotification('This email is not registered');
      if (res.data === 'incorrect_pass') setNotification('Incorrect password. Please try again.');
    }).catch(() => setNotification('server error please try again'))
  };

  return (
    <div className={styles.authcontainer}>
      <div className={styles.authcard}>
       <Logo />
        <h2>Welcome back</h2>
        <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className={`${styles.btn} ${styles.btnprimary}`}>Log In</button>
        </form>
        <p className={styles.authredirect}>
          Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;