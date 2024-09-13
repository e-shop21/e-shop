import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const styles = {
  nav: {
    backgroundColor: 'white',
    padding: '16px 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    gap: '16px'
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '16px'
  },
  searchInput: {
    border: '1px solid #d1d5db',
    padding: '8px',
    borderRadius: '4px'
  },
  icon: {
    height: '24px',
    width: '24px'
  },
  sellerButton: {
    backgroundColor: '#DB4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '14px'
  }
};

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.title}>Exclusive</h1>
        <ul style={styles.ul}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/contact" style={styles.link}>Contact</Link></li>
          <li><Link to="/about" style={styles.link}>About</Link></li>
          <li><Link to="/signup" style={styles.link}>Sign Up</Link></li>
        </ul>
        <div style={styles.searchContainer}>
          <input type="text" placeholder="Search" style={styles.searchInput} />
          <Link to="/user-profile" style={styles.link}>
            <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
          <Link to="/cart" style={styles.link}>
            <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
          {/* <Link to="/seller/profile" style={styles.sellerButton}>
            Seller Profile
          </Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;