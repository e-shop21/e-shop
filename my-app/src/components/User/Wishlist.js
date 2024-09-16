import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1274/api/wishlist/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const wishlistWithImages = await Promise.all(response.data.wishlists.map(async (item) => {
        const imageResponse = await axios.get(`http://localhost:1274/api/images/${item.product.id}`);
        return { ...item, product: { ...item.product, images: imageResponse.data.images } };
      }));
      setWishlist(wishlistWithImages);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('There are no items in your wishlist.');
    }
  };

  const deleteFromWishlist = async (e, productId) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1274/api/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchWishlist();
    } catch (error) {
      console.error('Error deleting from wishlist:', error);
      setError('Error deleting item from wishlist.');
    }
  };

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Home</a>
        <span style={styles.navSeparator}>/</span>
        <span style={styles.navCurrent}>My Wishlist</span>
      </nav>
      <div style={styles.content}>
        <Sidebar />
        <main style={styles.main}>
          <h2 style={styles.title}>My Wishlist</h2>
          {error && <div style={styles.error}>{error}</div>}
          {wishlist.map(item => (
            <div key={item.id} style={styles.wishlistItem} onClick={() => handleItemClick(item.product.id)}>
              {item.product.images && item.product.images.length > 0 ? (
                <img src={item.product.images[0].url} alt={item.product.name} style={styles.productImage} />
              ) : (
                <div style={styles.noImage}>No Image Available</div>
              )}
              <div style={styles.productInfo}>
                <p style={styles.productName}>Product: {item.product.name}</p>
                <p style={styles.productPrice}>Price: ${item.product.price}</p>
                <button 
                  onClick={(e) => deleteFromWishlist(e, item.product.id)} 
                  style={styles.deleteButton}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
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
  noImage: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginRight: '20px',
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
  wishlistItem: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '15px',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '20px',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: '18px',
    marginBottom: '5px',
  },
  productPrice: {
    fontSize: '16px',
    color: '#e74c3c',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#e74c3c',
    marginBottom: '10px',
  },
};

export default Wishlist;