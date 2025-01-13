import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const mintToken = async (address: string) => {
  const response = await axios.post(`${API_URL}/mint`, { address });
  return response.data;
};

export const getAccountDetails = async (address: string) => {
  const response = await axios.get(`${API_URL}/account/${address}`);
  return response.data;
};
