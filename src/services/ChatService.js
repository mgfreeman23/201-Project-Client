import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getMessages = async (matchId) => {
  const response = await axios.get(`${BASE_URL}/messages/${matchId}`);
  return response.data;
};

export const sendMessage = async (message) => {
  const response = await axios.post(`${BASE_URL}/messages`, message);
  return response.data;
};

export const startChat = async (matchId) => {
  const response = await axios.post(`${BASE_URL}/chat/${matchId}/start`);
  return response.data;
};