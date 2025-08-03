import { useState } from 'react';
import { useSnackbar } from 'notistack';
import api from '../utils/api';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/books');
      setBooks(data.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch books', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (bookData) => {
    try {
      await api.post('/books', bookData);
      enqueueSnackbar('Book created successfully', { variant: 'success' });
      return true;
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Error creating book', { 
        variant: 'error' 
      });
      return false;
    }
  };

  return { books, loading, fetchBooks, createBook };
};