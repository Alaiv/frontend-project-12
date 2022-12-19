import axios from 'axios';

export const loginUser = async ({ userName, password }) => {
  const response = await axios.post('/api/v1/login', { username: userName, password });
  return response.data;
};

export const getUserData = async (token) => {
  const response = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
