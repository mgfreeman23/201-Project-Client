import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Adjust based on your backend

export const saveProfile = async (profileData) => {
  const response = await axios.post(`${BASE_URL}/profile`, profileData);
  return response.data;
};
