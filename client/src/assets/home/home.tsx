import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from '../../utils/isLoggedIn';

const HomePage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  isLoggedIn()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');
    if (!token) {
      navigate('/');
    } else {
      setName(userName || '');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <button onClick={() => navigate('/host')}>Host Stream</button>
      <button onClick={() => navigate('/join')}>Join Stream</button>
    </div>
  );
};

export default HomePage;