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
      // Direct payload mapping to ensure Spring Boot DTO compatibility
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      
      await register(payload);
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      console.error('Registration error:', err);
      // Enhanced error handling for backend responses (Validation errors, Duplicate email, etc)
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data.errors) {
          // Handle Spring Boot validation errors array
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
          <Coffee size={40} className="primary-color" />
          <h1>JavaMastery</h1>
        </div>
        
        <p className="auth-subtitle">Join the community of Java experts.</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          
          <div className="input-group">
            <User size={20} className="input-icon" />
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
              minLength={6}
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                <span>Creating Account...</span>
              </div>
            ) : 'Register Now'}
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
