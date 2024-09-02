import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from '../utils/isLoggedIn';
import styles from './styles/home.module.css'
import { useSocketContext } from '../context/socketContext';
import CreateSoalWaller from '../PaymentComponent/crypto/soal/createSoalWallet';
import RequestAirDrop from '../PaymentComponent/crypto/soal/requestAirDrop';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const socket = useSocketContext()
  isLoggedIn()

  console.log(import.meta.env.VITE_RPC_END_POINT);

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
      <div>{username}</div>
      <CreateSoalWaller />
      <div className={styles.ctabuttons}>
        <button className={`${styles.btn} ${styles.btnprimary}`} onClick={() => navigate('/host-view')}>
          Host Stream
        </button>
        <button className={`${styles.btn} ${styles.btnprimary}`} onClick={() => navigate('/join')}>
          Send Request
        </button>
      </div>
      <RequestAirDrop />
    </div>
  );
};

export default HomePage;