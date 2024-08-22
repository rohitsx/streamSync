import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <div className="logo">
            <div className="logo-quadrant"></div>
            <div className="logo-quadrant"></div>
            <div className="logo-quadrant"></div>
            <div className="logo-quadrant"></div>
          </div>
          <h1 className="logo-text">stream<span>Sync</span></h1>
        </div>
        <h2>Create your account</h2>
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