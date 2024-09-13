import React from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const pendingProducts = 15;
  const soldProducts = 25;

  const products = [
    { id: 1, name: 'Product 1', price: 19.99, category: 'Electronics', status: 'Pending' },
    { id: 2, name: 'Product 2', price: 29.99, category: 'Clothing', status: 'Sold' },
    { id: 3, name: 'Product 3', price: 39.99, category: 'Home & Garden', status: 'Pending' },
    // Add more dummy products here
  ];

  return (
    <div className="container">
      <h1>Seller Dashboard</h1>
      <div className="dashboard-container">
        <div className="sidebar">
          <Link to="/seller/profile">Profile</Link>
          <Link to="/seller/dashboard">Dashboard</Link>
          <Link to="/seller/create-product">Create Product</Link>
          <Link to="/seller/product-list">Product List</Link>
        </div>
        <div className="dashboard-content">
          <div className="counters">
            <div className="counter">
              <h2>Products Pending</h2>
              <p>{pendingProducts}</p>
            </div>
            <div className="counter">
              <h2>Products Sold</h2>
              <p>{soldProducts}</p>
            </div>
          </div>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.status}</td>
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
        .dashboard-container {
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
        .dashboard-content {
          flex: 1;
        }
        .counters {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .counter {
          background-color: #f0f0f0;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
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
      `}</style>
    </div>
  );
};

export default SellerDashboard;