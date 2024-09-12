import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from '../utils/isLoggedIn';
import styles from './styles/home.module.css'
import { useSocketContext } from '../context/socketContext';
import CreateSoalWaller from '../PaymentComponent/crypto/soal/createSoalWallet';
import RequestAirDrop from '../PaymentComponent/crypto/soal/requestAirDrop';
import getKeyPair from '../utils/getkeyPair';
import NotifcationBox from '../assets/notification/notification';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const socket = useSocketContext()
  const [notification, setNotification] = useState<string | null>(null)
  isLoggedIn()


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userusername = localStorage.getItem('username');
    if (!token) navigate('/');
    else setUsername(userusername || '');
  }, [navigate]);

  useEffect(() => { }, [socket])

  function handelHostView() {
    try {
      getKeyPair();
      navigate('/host-view');
    } catch (err: any) {
      if (err.message === 'No private key') {
        setNotification('Create wallet before creating room');
      }
    }
  }


  return (
    <div className={styles.homecontainer}>
      <div>{username}</div>
      <CreateSoalWaller />
      <div className={styles.ctabuttons}>
        <button className={`${styles.btn} ${styles.btnprimary}`} onClick={handelHostView}>
          Host Stream
        </button>
        <button className={`${styles.btn} ${styles.btnprimary}`} onClick={() => navigate('/join')}>
          Send Request
        </button>
      </div>
      <RequestAirDrop />
      <NotifcationBox notificationMessage={notification} setNotification={setNotification} />
    </div>
  );
};

export default HomePage;
