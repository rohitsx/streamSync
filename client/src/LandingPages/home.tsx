import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from '../utils/isLoggedIn';
import styles from './styles/home.module.css'
import { useSocketContext } from '../context/socketContext';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const socket = useSocketContext()
  isLoggedIn()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userusername = localStorage.getItem('username');
    if (!token) navigate('/');
    else setUsername(userusername || '');
  }, [navigate]);

  useEffect(() => {
    console.log('socket connected id', socket?.id);

  }, [socket])

  return (
    <div className={styles.homecontainer}>
      <h1>Welcome, {username}!</h1>
      <div className={styles.ctabuttons}>
        <button className={`${styles.btn} ${styles.btnprimary}`} onClick={() => navigate('/host-view')}>
          Host Stream
        </button>
        <button className={`${styles.btn} ${styles.btnprimary}`} onClick={() => navigate('/join')}>
          Send Request
        </button>
      </div>
    </div>
  );
};

export default HomePage;