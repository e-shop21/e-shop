import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 19.99, category: 'Electronics', status: 'Pending' },
    { id: 2, name: 'Product 2', price: 29.99, category: 'Clothing', status: 'Sold' },
    { id: 3, name: 'Product 3', price: 39.99, category: 'Home & Garden', status: 'Pending' },
    // Add more dummy products here
  ];

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="product-list-container">
        <div className="sidebar">
          <Link to="/seller/profile">Profile</Link>
          <Link to="/seller/dashboard">Dashboard</Link>
          <Link to="/seller/create-product">Create Product</Link>
          <Link to="/seller/product-list">Product List</Link>
        </div>
        <div className="product-list-content">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.status}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .product-list-container {
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
        .product-list-content {
          flex: 1;
        }
        .product-table {
          width: 100%;
          border-collapse: collapse;
        }
        .product-table th, .product-table td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: left;
        }
        .product-table th {
          background-color: #f0f0f0;
        }
        button {
          margin-right: 0.5rem;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProductList;