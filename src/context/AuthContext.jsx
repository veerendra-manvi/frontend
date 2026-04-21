import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token.trim() !== "") {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUser() {
    try {
      const res = await api.get("/api/dashboard/me");
      setUser(res.data);
    } catch (error) {
      console.log("Fetch user failed:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    const res = await api.post("/api/users/login", credentials);

    console.log("Login response:", res.data);

    const token =
      res.data.token ||
      res.data.jwtToken ||
      res.data.accessToken ||
      res.data;

    localStorage.setItem("token", token);

    await fetchUser();

    return res.data;
  }

  async function register(userData) {
    const res = await api.post("/api/users/register", userData);
    return res.data;
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);