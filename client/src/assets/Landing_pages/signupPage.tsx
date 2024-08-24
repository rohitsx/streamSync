import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import Logo from '../logo/logo';
import axios from 'axios';
import NotifcationBox from '../notification/notification';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [notification, setNotification] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}signup`, {
      'name': name,
      'email': email,
      'password': password
    }).then(res =>{
      console.log(res.status);
      
      if (res.status == 201) {
        setNotification('Account register, Please login')
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
      if (res.status == 400) setNotification('email alredy exits please login using same email.')
    })

  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        <h2>Create your account</h2>
        <NotifcationBox notificationMessage={notification} setNotification={setNotification} color={'blue'} />
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="Name"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;