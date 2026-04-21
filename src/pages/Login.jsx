import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Mail, Lock, Loader2 } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-logo">
          <Coffee className="primary-color w-[40px] h-[40px]" />
          <h1 className="italic tracking-tighter">JavaMastery</h1>
        </div>
        
        <p className="auth-subtitle italic">Welcome back! Continue your Java journey.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="input-group">
            <Mail className="input-icon w-[20px] h-[20px]" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon w-[20px] h-[20px]" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="auth-btn group" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin w-[20px] h-[20px] mx-auto" /> : <span className="group-hover:tracking-widest transition-all">Sign In</span>}
          </button>
        </form>
        
        <p className="auth-footer">
          Don't have an account? <Link to="/register" className="italic font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;