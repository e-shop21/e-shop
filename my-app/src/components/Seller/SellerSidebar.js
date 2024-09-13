import React from 'react';
import { Link } from 'react-router-dom';

const SellerSidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <section>
        <h3 style={styles.sectionTitle}>Manage My Account</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <Link to="/seller/profile" style={styles.link}>My Profile</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/seller/dashboard" style={styles.link}>Dashboard</Link>
          </li>
        </ul>
      </section>
      <section>
        <h3 style={styles.sectionTitle}>Manage Products</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <Link to="/seller/create-product" style={styles.link}>Create Product</Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/seller/product-list" style={styles.link}>Product List</Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    paddingRight: '20px',
    borderRight: '1px solid #ddd',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
};

export default SellerSidebar;