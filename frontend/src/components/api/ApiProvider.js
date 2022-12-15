import axios from 'axios';

const loginUser = async ({ userName, password }) => {
  const response = await axios.post('/api/v1/login', { username: userName, password });

  return response.data;
};

export default loginUser;
