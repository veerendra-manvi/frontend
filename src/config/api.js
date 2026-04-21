/**
 * Centralized API configuration
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  // Add other resource endpoints here as they grow
};
