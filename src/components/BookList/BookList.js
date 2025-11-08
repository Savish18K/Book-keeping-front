import React from 'react';
import { formatPrice } from '../../utils/helpers';

const BookList = ({ 
  books, 
  onEdit, 
  onDelete, 
  isLoading = false 
}) => {
  if (isLoading) {
    return <div className="loading">Loading books...</div>;
  }

  if (books.length === 0) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No books found. Add some books to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Books List</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{formatPrice(book.price)}</td>
              <td>
                <span className={`stock-status ${book.stock === 0 ? 'stock-out' : 'stock-in'}`}>
                  {book.stock === 0 ? 'Out of Stock' : book.stock}
                </span>
              </td>
              <td>{book.category?.name}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;