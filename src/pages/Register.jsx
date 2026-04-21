import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Mail, Lock, User, Loader2 } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
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
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      
      await register(payload);
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data.errors) {
          const validationMsg = Object.values(err.response.data.errors).join(', ');
          setError(validationMsg);
        } else {
          setError('Invalid registration details. Please check your input.');
        }
      } else {
        setError('Network error. Backend might be offline.');
      }
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
        
        <p className="auth-subtitle italic">Join the community of Java experts.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="input-group">
            <User className="input-icon w-[20px] h-[20px]" />
            <input 
              name="fullName"
              type="text" 
              placeholder="Username / Full Name" 
              value={formData.fullName}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon w-[20px] h-[20px]" />
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
            <Lock className="input-icon w-[20px] h-[20px]" />
            <input 
              name="password"
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required 
              minLength={6}
            />
          </div>
          
          <button type="submit" className="auth-btn group" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-[18px] h-[18px]" />
                <span>Creating Account...</span>
              </div>
            ) : <span className="group-hover:tracking-widest transition-all">Register Now</span>}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="italic font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
