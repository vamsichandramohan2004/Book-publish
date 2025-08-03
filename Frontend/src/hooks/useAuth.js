import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser 
} from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      setUser(user);
      enqueueSnackbar('Login successful', { variant: 'success' });
      return true;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const user = await registerUser(userData);
      setUser(user);
      enqueueSnackbar('Registration successful', { variant: 'success' });
      return true;
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      enqueueSnackbar('Logged out successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login, register, logout, fetchUser };
};