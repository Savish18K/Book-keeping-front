// Helper functions used throughout the app

export const formatPrice = (price) => { 
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const validateBookForm = (formData) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!formData.author.trim()) {
    errors.author = 'Author is required';
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (formData.stock < 0) {
    errors.stock = 'Stock cannot be negative';
  }

  if (!formData.bookCategoryId) {
    errors.bookCategoryId = 'Category is required';
  }

  return errors;
};

// Extra helper functions
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
