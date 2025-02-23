import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createRequest = async (request, token) => {
  const response = await axios.post(`${API_URL}/requests`, request, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getRequests = async (token) => {
  const response = await axios.get(`${API_URL}/requests`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const approveRequest = async (id, token) => {
  const response = await axios.put(`${API_URL}/requests/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const rejectRequest = async (id, token) => {
  const response = await axios.put(`${API_URL}/requests/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};