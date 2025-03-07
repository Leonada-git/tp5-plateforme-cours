import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);
  console.log(user)

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5001/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5001/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      fetchUserProfile();
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
