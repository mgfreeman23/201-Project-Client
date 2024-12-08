import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Adjust based on your backend

export const saveProfile = async (profileData) => {
  console.log(`/profile`, profileData);
  const response = await axios.post(`/CSCI201-Final-Project-Server/profile`, profileData);
  return response.data;
};

