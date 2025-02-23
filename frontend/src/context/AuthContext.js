import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../api/authApi';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ role: response.data.role });
        } catch (error) {
          console.error('Failed to fetch user:', error.message);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, [token]);

  const signIn = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser({ role: data.role });
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signUp = async (name, email, password, adminSecret) => {
    try {
      const data = await register(name, email, password, adminSecret);
      setUser({ role: data.role });
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);