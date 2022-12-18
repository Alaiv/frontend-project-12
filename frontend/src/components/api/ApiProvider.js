import axios from 'axios';

export const loginUser = async ({ userName, password }) => {
  try {
    const response = await axios.post('/api/v1/login', { username: userName, password });
    return response.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (e) {
    console.error(e);
    return e;
  }
};
