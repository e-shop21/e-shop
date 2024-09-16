import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside style={styles.sidebar}>
      <section style={styles.section}>
        <Link to="/user/profile" style={location.pathname === '/user/profile' ? styles.activeLink : styles.link}>
          <h3 style={styles.sectionTitle}>Manage My Account</h3>
        </Link>
      </section>
      <section style={styles.section}>
        <Link to="/user/orders" style={location.pathname === '/user/orders' ? styles.activeLink : styles.link}>
          <h3 style={styles.sectionTitle}>My Orders</h3>
        </Link>
      </section>
      <section style={styles.section}>
        <Link to="/user/wishlist" style={location.pathname === '/user/wishlist' ? styles.activeLink : styles.link}>
          <h3 style={styles.sectionTitle}>My Wishlist</h3>
        </Link>
      </section>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    paddingRight: '20px',
    borderRight: '1px solid #ddd',
    boxSizing: 'border-box',
    position: 'relative',
    minHeight: '100%',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  activeLink: {
    textDecoration: 'none',
    color: '#e74c3c',
    fontWeight: 'bold',
  },
};

export default Sidebar;