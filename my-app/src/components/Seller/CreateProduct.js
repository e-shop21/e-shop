import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    subCategory: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: files.slice(0, 4) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the product data to your backend
    console.log('Product submitted:', product);
  };

  return (
    <div className="container">
      <h1>Create Product</h1>
      <div className="create-product-container">
        <div className="sidebar">
          <Link to="/seller/profile">Profile</Link>
          <Link to="/seller/dashboard">Dashboard</Link>
          <Link to="/seller/create-product">Create Product</Link>
          <Link to="/seller/product-list">Product List</Link>
        </div>
        <div className="create-product-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
            />
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
            <input
              type="text"
              name="subCategory"
              value={product.subCategory}
              onChange={handleInputChange}
              placeholder="Sub-category"
              required
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              required
            />
            <button type="submit">Create Product</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .create-product-container {
          display: flex;
          gap: 2rem;
        }
        .sidebar {
          width: 200px;
        }
        .sidebar a {
          display: block;
          padding: 0.5rem;
          text-decoration: none;
          color: #333;
        }
        .create-product-content {
          flex: 1;
        }
        input, button {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.5rem;
        }
        button {
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CreateProduct;