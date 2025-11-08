import React, { useState, useEffect } from 'react';
import { validateBookForm } from '../../utils/helpers';


const BookForm = ({ 
  book = null, 
  categories, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    bookCategoryId: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price.toString(),
        stock: book.stock.toString(),
        bookCategoryId: book.bookCategoryId.toString()
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateBookForm({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      bookCategoryId: parseInt(formData.bookCategoryId)
    };

    onSubmit(submitData);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          {book ? 'Edit Book' : 'Add New Book'}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.author && <div className="form-error">{errors.author}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
          {errors.price && <div className="form-error">{errors.price}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            Stock *
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            className="form-control"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
          />
          {errors.stock && <div className="form-error">{errors.stock}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="bookCategoryId" className="form-label">
            Category *
          </label>
          <select
            id="bookCategoryId"
            name="bookCategoryId"
            className="form-control"
            value={formData.bookCategoryId}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.bookCategoryId && (
            <div className="form-error">{errors.bookCategoryId}</div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;