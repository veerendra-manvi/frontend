import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setAuthError(null);
      const res = await api.get("/api/dashboard/me");
      if (res.data) {
        setUser(res.data);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error("Critical Auth Error:", error);
      setAuthError(error.message || "Backend unreachable");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 🛡️ Guard: Critical Startup Timeout Fallback
    // Ensures the app never gets stuck on "Loading..." even if the network is dead
    const watchdog = setTimeout(() => {
      if (loading) {
        console.warn("Auth Timeout: Forcing load completion after 12 seconds.");
        setLoading(false);
        setAuthError("Authentication timed out. Site may be unstable.");
      }
    }, 12000);

    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token.trim() !== "") {
      fetchUser();
    } else {
      setLoading(false);
    }

    return () => clearTimeout(watchdog);
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
      value={{ user, loading, authError, login, register, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);