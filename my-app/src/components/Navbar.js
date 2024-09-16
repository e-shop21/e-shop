import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import { fetchProductsBySearch } from '../api/api';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:1274/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserRole(response.data.user.role);
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
          navigate('/signin');
        }
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserRole(null);
    navigate('/signin');
  };

  const getProfilePath = () => {
    switch(userRole) {
      case 'seller':
        return '/seller/profile';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/user-profile';
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const products = await fetchProductsBySearch(searchTerm);
      navigate(`/category/all/all?search=${searchTerm}`, { state: { searchResults: products } });
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.title}>Exclusive</h1>
        <ul style={styles.ul}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/contact" style={styles.link}>Contact</Link></li>
          <li><Link to="/about" style={styles.link}>About</Link></li>
          {!userRole && <li><Link to="/signin" style={styles.link}>Sign In</Link></li>}
        </ul>
        <div style={styles.searchContainer}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>
          {userRole && (
            <>
              <Link to={getProfilePath()} style={styles.link}>
                <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </Link>
              {userRole !== 'admin' && (
                <Link to="/cart" style={styles.link}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </Link>
              )}
              <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

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
  searchForm: {
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    border: '1px solid #d1d5db',
    padding: '8px',
    borderRadius: '4px 0 0 4px',
    width: '200px'
  },
  searchButton: {
    backgroundColor: '#DB4444',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer'
  },
  icon: {
    height: '24px',
    width: '24px'
  },
  logoutButton: {
    backgroundColor: '#DB4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Navbar;