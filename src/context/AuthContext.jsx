import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSlow, setIsSlow] = useState(false);
  const [authError, setAuthError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setAuthError(null);
      const res = await api.get("/api/dashboard/me");
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Auth Handshake Interrupted:", error);
      // We do NOT clear the token here anymore unless it's a 401/403 (handled in api.js)
      // This allows the app to retry or show "Waking server" without kicking the user out
      setAuthError(error.message || "Backend synchronization failed");
    } finally {
      setLoading(false);
      setIsSlow(false);
    }
  }, []);

  useEffect(() => {
    // 🛡️ Tactical Watchdogs
    
    // 1. Slow Server Detection (Waking server state)
    const slowTimer = setTimeout(() => {
      if (loading) {
        console.warn("Detected slow response. Waking server...");
        setIsSlow(true);
      }
    }, 6000); // If taking > 6s, it's likely sleeping

    // 2. Critical Hang Guard (Prevent infinite spinner)
    const hangGuard = setTimeout(() => {
      if (loading) {
        console.warn("Auth cluster hang detected. Forcing load completion.");
        setLoading(false);
      }
    }, 45000); 

    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token.trim() !== "") {
      fetchUser();
    } else {
      setLoading(false);
    }

    return () => {
      clearTimeout(slowTimer);
      clearTimeout(hangGuard);
    };
  }, [fetchUser, loading]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await api.post("/api/users/login", credentials);
      
      const token =
        res.data.token ||
        res.data.jwtToken ||
        res.data.accessToken ||
        (typeof res.data === 'string' ? res.data : null);

      if (!token) throw new Error("Invalid token format from server");

      localStorage.setItem("token", token);
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