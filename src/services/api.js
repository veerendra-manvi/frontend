import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // 🛡️ 20 second tactical timeout as requested
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
  (error) => Promise.reject(error)
);

// Response interceptor with automatic retry and selective redirection
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    // 🛡️ Automatic Retry Logic: Retry once for network errors or timeouts
    // This handles the 'server waking' scenario without failing immediately
    if (config && !config._retry && (error.code === 'ECONNABORTED' || !error.response)) {
      config._retry = true;
      console.warn("⏳ Backend latency detected. Initiating single-shot tactical retry...");
      return api(config);
    }

    // 🛡️ Guard: Unauthorized Access (ONLY redirect on real 401/403)
    // Removed the redirect logic for !error.response to preserve startup stability
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("🔒 Session unauthorized. Clearing access and redirecting.");
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?error=unauthorized';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;