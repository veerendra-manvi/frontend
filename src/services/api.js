import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 🛡️ 10 second tactical timeout
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🛡️ Guard: Critical Backend Unavailability / Timeout
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error("🏁 Backend cluster unreachable or handshake timed out.");
      
      // If we're not on a public page, redirect to login to avoid infinite loading
      const publicPages = ['/login', '/register'];
      if (!publicPages.some(page => window.location.pathname.startsWith(page))) {
        console.warn("Forcing redirect to login due to backend unavailability.");
        localStorage.removeItem('token');
        window.location.href = '/login?error=timeout';
      }
    }

    // 🛡️ Guard: Unauthorized Access
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("🔒 Session expired or unauthorized. Purging local tokens.");
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?error=session_expired';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;