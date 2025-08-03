import api from './api';

export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post('/auth/signup', userData);
    localStorage.setItem('token', data.token);
    return data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logoutUser = async () => {
  try {
    await api.get('/auth/logout');
    localStorage.removeItem('token');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get('/auth/me'); // Correct GET request
    return data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};
