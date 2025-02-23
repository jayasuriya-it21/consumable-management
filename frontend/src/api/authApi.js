import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Fallback to explicit URL

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (name, email, password, adminSecret = '') => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, adminSecret });
  return response.data;
};