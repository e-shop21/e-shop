import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';
import Spacer from './Spacer';

const SellerDashboard = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('sold');
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
  
      const pendingResponse = await axios.get('http://localhost:1274/api/products/seller/pending', { headers });
      setPendingProducts(pendingResponse.data.products);
      const pendingTotal = pendingResponse.data.products.reduce((sum, product) => sum + product.quantity, 0);
      setTotalPending(pendingTotal);
  
      const soldResponse = await axios.get('http://localhost:1274/api/sold/seller/get', { headers });
      const soldItemsWithUserNames = await Promise.all(soldResponse.data.soldItems.map(async (item) => {
        const userResponse = await axios.get(`http://localhost:1274/api/users/${item.user_id}`, { headers });
        return { ...item, userName: `${userResponse.data.firstName} ${userResponse.data.lastName}` };
      }));
      setSoldProducts(soldItemsWithUserNames);
  
      const productsResponse = await axios.get('http://localhost:1274/api/products/seller/get', { headers });
      setProducts(productsResponse.data.products);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.response?.data || error.message);
    }
  };

  const renderTable = () => {
    if (view === 'sold') {
      return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Quantity Sold</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Sold At</th>
            </tr>
          </thead>
          <tbody>
            {soldProducts.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{item.product.name}</td>
                <td style={styles.td}>{item.userName}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>${item.product.price.toFixed(2)}</td>
                <td style={styles.td}>${(item.quantity * item.product.price).toFixed(2)}</td>
                <td style={styles.td}>{new Date(item.sold_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.subcategory.category.name}</td>
                <td>{product.subcategory.name}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };






  return (
    <div style={styles.container}>
      <SellerSidebar />
      <main style={styles.main}>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <span style={styles.navSeparator}>/</span>
          <span style={styles.navCurrent}>Seller Dashboard</span>
        </nav>
        <h2 style={styles.title}>Seller Dashboard</h2>
        <div style={styles.counters}>
          <div style={styles.counter} onClick={() => setView('pending')}>
            <h3>Products Pending</h3>
            <p>{totalPending}</p>
          </div>
          <div style={styles.counter} onClick={() => setView('sold')}>
            <h3>Products Sold</h3>
            <p>{soldProducts.length}</p>
          </div>
        </div>
        {renderTable()}
        <Spacer />
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  
    minHeight: '100vh',
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
  main: {
    marginLeft: '220px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color: '#e74c3c',
    marginBottom: '20px',
  },
  counters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  counter: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '30%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
};


export default SellerDashboard;