import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NotifcationBox from '../assets/notification/notification';
import isLoggedIn from '../utils/isLoggedIn';
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

        localStorage.setItem('username', res.data.username);

        window.location.reload();
      }

      if (res.data === 'incorrect_email') setNotification('This email is not registered');
      if (res.data === 'incorrect_pass') setNotification('Incorrect password. Please try again.');
    }).catch(() => setNotification('server error please try again'))
  };

  return (
    <div className="min-w-96 max-h-[580px] bg-gradient-to-br from-purple-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Welcome back</h2>
        </div>

        <NotifcationBox notificationMessage={notification} setNotification={setNotification} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-base t-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-purple-300">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;