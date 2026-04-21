import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);
  const [authError, setAuthError] = useState(null);

  const fetchUser = useCallback(async (isInitialLoad = false) => {
    try {
      setAuthError(null);
      const res = await api.get("/api/dashboard/me");
      
      if (res.data) {
        setUser(res.data);
      } else {
        // If we get an empty response but was successful, something is wrong
        if (isInitialLoad) {
           localStorage.removeItem("token");
        }
        setUser(null);
      }
    } catch (error) {
      console.error("Auth Synchronization Error:", error);
      
      // 🛡️ Guard: Identification of Network vs. Auth Errors
      const isAuthError = error.response && (error.response.status === 401 || error.response.status === 403);
      
      if (isAuthError) {
        localStorage.removeItem("token");
        setUser(null);
        setAuthError("Unauthorized session");
      } else {
        // Network errors or timeouts: Preserve user if they exist, or just set error
        // DO NOT logout on temporary timeout
        setAuthError(error.message || "Backend synchronization unstable");
      }
    } finally {
      setLoading(false);
      setIsSlow(false);
    }
  }, []);

  useEffect(() => {
    // 🛡️ One-time startup check
    const token = localStorage.getItem("token");
    
    // Slow detection timer
    let slowTimer;
    if (token) {
      slowTimer = setTimeout(() => {
        setIsSlow(true);
      }, 6000);
    }

    if (token && token !== "undefined" && token.trim() !== "") {
      fetchUser(true);
    } else {
      setLoading(false);
    }

    return () => {
      if (slowTimer) clearTimeout(slowTimer);
    };
  }, [fetchUser]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const res = await api.post("/api/users/login", credentials);
      
      const token =
        res.data.token ||
        res.data.jwtToken ||
        res.data.accessToken ||
        (typeof res.data === 'string' ? res.data : null);

      if (!token) throw new Error("Neural Token missing from server response");

      localStorage.setItem("token", token);
      
      // Ensure the user data is fetched BEFORE completing logic
      await fetchUser();
      
      return res.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post("/api/users/register", userData);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, isSlow, authError, login, register, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);