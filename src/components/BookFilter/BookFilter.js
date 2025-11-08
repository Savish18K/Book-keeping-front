import React from 'react';

const BookFilter = ({ categories, selectedCategory, onCategoryChange, onClearFilter }) => {
  return (
    <div className="filter-section">
      <div className="filter-group">
        <label htmlFor="category-filter" className="form-label">
          Filter by Category:
        </label>
        <select
          id="category-filter"
          className="form-control"
          style={{ width: 'auto' }}
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={onClearFilter}
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default BookFilter;