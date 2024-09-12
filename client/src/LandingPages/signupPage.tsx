import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo/logo';
import axios from 'axios';
import isLoggedIn from '../utils/isLoggedIn';
import NotifcationBox from '../assets/notification/notification';

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
    <div className="min-w-96 max-h-[700px] min-h-[600px] bg-gradient-to-br from-purple-900 to-black text-white flex items-center justify-center p-3">
      <div className="max-w-md w-full h-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-4">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Create your account</h2>
        </div>

        <NotifcationBox notificationMessage={notification} setNotification={setNotification} color={notificationColor} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-base mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-base mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-base mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button type="submit" className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Log In</Link>
        </p>
      </div>
    </div>


  );
};

export default SignupPage;
