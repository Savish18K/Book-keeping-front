import React, { useState, useEffect } from 'react';
import BookList from './components/BookList/BookList';
import BookForm from './components/BookForm/BookForm';
import BookFilter from './components/BookFilter/BookFilter';
import { bookService } from './services/api';
import { validateBookForm } from './utils/helpers';
import './styles/global.css';


function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load books when category filter changes
  useEffect(() => {
    loadBooks();
  }, [selectedCategory]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      await loadCategories();
      await loadBooks();
    } catch (error) {
      showMessage('error', 'Failed to load initial data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const response = await bookService.getAllBooks(selectedCategory);
      setBooks(response.data);
    } catch (error) {
      showMessage('error', 'Failed to load books');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await bookService.getAllCategories();
      if (response.data.length === 0) {
        // Seed categories if none exist
        await bookService.seedCategories();
        const newCategories = await bookService.getAllCategories();
        setCategories(newCategories.data);
      } else {
        setCategories(response.data);
      }
    } catch (error) {
      showMessage('error', 'Failed to load categories');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const handleSubmitBook = async (formData) => {
    try {
      setIsSubmitting(true);
      
      if (editingBook) {
        await bookService.updateBook(editingBook.id, formData);
        showMessage('success', 'Book updated successfully');
      } else {
        await bookService.createBook(formData);
        showMessage('success', 'Book added successfully');
      }

      setShowForm(false);
      setEditingBook(null);
      await loadBooks();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save book';
      showMessage('error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await bookService.deleteBook(bookId);
      showMessage('success', 'Book deleted successfully');
      await loadBooks();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete book';
      showMessage('error', errorMessage);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Book Management System</h1>
        </div>
      </header>

      <div className="container">
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {!showForm ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Books</h2>
              <button
                className="btn btn-success"
                onClick={handleAddBook}
              >
                Add New Book
              </button>
            </div>

            <BookFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onClearFilter={handleClearFilter}
            />

            <BookList
              books={books}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              isLoading={isLoading}
            />
          </>
        ) : (
          <BookForm
            book={editingBook}
            categories={categories}
            onSubmit={handleSubmitBook}
            onCancel={handleCancelForm}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

export default App;
