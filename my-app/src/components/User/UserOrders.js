import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 8;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1274/api/sold/user/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.soldItems);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('You have no orders yet.');
    }
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = currentPage * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Home</a>
        <span style={styles.navSeparator}>/</span>
        <span style={styles.navCurrent}>My Orders</span>
      </nav>
      <div style={styles.content}>
        <Sidebar />
        <main style={styles.main}>
          <h2 style={styles.title}>My Orders</h2>
          {error && <div style={styles.error}>{error}</div>}
          {currentOrders.map(order => (
            <div key={order.id} style={styles.orderItem}>
              {order.product.images && order.product.images.length > 0 ? (
                <img src={order.product.images[0].url} alt={order.product.name} style={styles.productImage} />
              ) : (
                <div style={styles.noImage}>No Image Available</div>
              )}
              <div style={styles.orderDetails}>
                <p style={styles.productName}>Product: {order.product.name}</p>
                <p style={styles.productPrice}>Price: ${order.product.price}</p>
                <p style={styles.orderDate}>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          <div style={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>Prev</button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  nav: {
    marginBottom: '20px',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
  },
  navSeparator: {
    margin: '0 5px',
    color: '#999',
  },
  navCurrent: {
    color: '#999',
  },
  content: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    marginLeft: '40px',
  },
  title: {
    color: '#e74c3c',
    marginBottom: '20px',
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '15px',
    marginBottom: '15px',
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '20px',
  },
  noImage: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginRight: '20px',
  },
  orderDetails: {
    flex: 1,
  },
  productName: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  productPrice: {
    fontSize: '16px',
    color: '#e74c3c',
    marginBottom: '5px',
  },
  orderDate: {
    fontSize: '14px',
    color: '#666',
  },
  error: {
    color: '#e74c3c',
    marginBottom: '10px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
};

export default UserOrders;