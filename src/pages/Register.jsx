import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Mail, Lock, User, Loader2 } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-logo">
          <Coffee size={40} className="primary-color" />
          <h1>JavaMastery</h1>
        </div>
        
        <p className="auth-subtitle">Join the community of Java experts.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="input-group">
            <User size={20} className="input-icon" />
            <input 
              name="username"
              type="text" 
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input 
              name="email"
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              name="password"
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Register Now'}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
