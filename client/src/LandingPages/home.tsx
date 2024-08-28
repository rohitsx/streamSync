import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from '../utils/isLoggedIn';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  isLoggedIn()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userusername = localStorage.getItem('username');
    if (!token) navigate('/');
    else setUsername(userusername || '');
  }, [navigate]);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <button onClick={() => navigate('/host/' + username)}>Host Stream</button>
      <button onClick={() => navigate('/join_stream')}>Join Stream</button>
    </div>
  );
};

export default HomePage;