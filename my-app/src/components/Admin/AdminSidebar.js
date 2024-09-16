import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.activeLink : styles.link;
  };

  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.listItem}>
            <Link to="/admin/users" style={isActive('/admin/users')}>
              User Management
            </Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/admin/sellers" style={isActive('/admin/sellers')}>
              Seller Management
            </Link>
          </li>
          <li style={styles.listItem}>
            <Link to="/admin/homepage" style={isActive('/admin/homepage')}>
              Homepage Management
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    minHeight: '100%',
    borderRight: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.5em',
    color: '#333',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    display: 'block',
    padding: '10px',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  activeLink: {
    display: 'block',
    padding: '10px',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
  },
};

export default AdminSidebar;