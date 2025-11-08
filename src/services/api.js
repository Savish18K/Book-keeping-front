import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const bookService = {
  // Books
  getAllBooks: (categoryId = null) => {
    const params = categoryId ? { categoryId } : {};
    return api.get('/books', { params });
  },
  getBook: (id) => api.get(`/books/${id}`),
  createBook: (bookData) => api.post('/books', bookData),
  updateBook: (id, bookData) => api.patch(`/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/books/${id}`),

  // Categories
  getAllCategories: () => api.get('/book-categories'),
  seedCategories: () => api.post('/book-categories/seed'),
};

export default api;