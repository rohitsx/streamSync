import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');
    if (!token) {
      navigate('/login');
    } else {
      setName(userName || '');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome, {name}!</h1>
    </div>
  );
};

export default HomePage;