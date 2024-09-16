import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductSearch from './ProductSearch';
import SelectedProducts from './SelectedProducts';
import { fetchCategories, fetchSubcategories, fetchProducts, fetchProductsByCategory, fetchProductsBySubcategory } from '../../api/api';

const HomepageManagement = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState({ a: '', b: '', c: '', d: '' });
  const [exclusiveOffer, setExclusiveOffer] = useState('');
  const [pubContent, setPubContent] = useState('');
  const [currentContent, setCurrentContent] = useState({});

  useEffect(() => {
    fetchCurrentContent();
  }, []);

  const fetchCurrentContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [newArrivalsRes, exclusiveOfferRes, pubRes] = await Promise.all([
        axios.get('http://localhost:1274/api/commercials/new-arrivals', { headers }),
        axios.get('http://localhost:1274/api/commercials/exclusive-offer', { headers }),
        axios.get('http://localhost:1274/api/commercials/pub', { headers })
      ]);

      const getLatestContent = (data) => {
        if (Array.isArray(data) && data.length > 0) {
          return data[data.length - 1];
        }
        return null;
      };

      setCurrentContent({
        newArrivals: {
          a: getLatestContent(newArrivalsRes.data.filter(item => item.ref === 'NA:sectionA')),
          b: getLatestContent(newArrivalsRes.data.filter(item => item.ref === 'NA:sectionB')),
          c: getLatestContent(newArrivalsRes.data.filter(item => item.ref === 'NA:sectionC')),
          d: getLatestContent(newArrivalsRes.data.filter(item => item.ref === 'NA:sectionD')),
        },
        exclusiveOffer: getLatestContent(exclusiveOfferRes.data),
        pub: getLatestContent(pubRes.data)
      });
    } catch (error) {
      console.error('Error fetching current content:', error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const handleProductRemove = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleProductDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:1274/api/products/${productId}`, { headers });
      setSelectedProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    try {
      for (const [section, productId] of Object.entries(newArrivals)) {
        if (productId) {
          const productResponse = await axios.get(`http://localhost:1274/api/products/${productId}`, { headers });
          const productData = productResponse.data.product;
          const imageUrl = productData.images && productData.images.length > 0 ? productData.images[0].url : null;
          
          await axios.post('http://localhost:1274/api/commercials', {
            product_id: productId,
            url: imageUrl,
            ref: `NA:section${section.toUpperCase()}`
          }, { headers });
        }
      }

      if (exclusiveOffer) {
        const productResponse = await axios.get(`http://localhost:1274/api/products/${exclusiveOffer}`, { headers });
        const productData = productResponse.data.product;
        const imageUrl = productData.images && productData.images.length > 0 ? productData.images[0].url : null;
        
        await axios.post('http://localhost:1274/api/commercials', {
          product_id: exclusiveOffer,
          url: imageUrl,
          ref: 'exclusiveOffer'
        }, { headers });
      }

      if (pubContent) {
        const productResponse = await axios.get(`http://localhost:1274/api/products/${pubContent}`, { headers });
        const productData = productResponse.data.product;
        const imageUrl = productData.images && productData.images.length > 0 ? productData.images[0].url : null;
        
        await axios.post('http://localhost:1274/api/commercials', {
          product_id: pubContent,
          url: imageUrl,
          ref: 'Pub'
        }, { headers });
      }

      alert('Homepage content updated successfully');
      await fetchCurrentContent();
    } catch (error) {
      console.error('Error updating homepage content:', error);
      alert(`Error updating homepage content: ${error.message}`);
    }
  };

  const styles = {
    homepageManagement: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    contentSection: {
      marginBottom: '30px',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
    },
    newArrivalsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    newArrivalItem: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    updateButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      marginTop: '10px',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.homepageManagement}>
      <h2>Homepage Management</h2>
      
      <div style={styles.contentSection}>
        <h3>Product Search</h3>
        <ProductSearch onProductSelect={handleProductSelect} onProductDelete={handleProductDelete} />
      </div>
      
      <div style={styles.contentSection}>
        <h3>Selected Products</h3>
        <SelectedProducts 
          products={selectedProducts} 
          onProductRemove={handleProductRemove}
        />
      </div>

      <div style={styles.contentSection}>
        <h3>New Arrivals</h3>
        <div style={styles.newArrivalsGrid}>
          {['a', 'b', 'c', 'd'].map(section => (
            <div key={section} style={styles.newArrivalItem}>
              <label htmlFor={`section-${section}`} style={styles.label}>Section {section.toUpperCase()}</label>
              <input
                id={`section-${section}`}
                type="text"
                placeholder="Product ID"
                value={newArrivals[section]}
                onChange={(e) => setNewArrivals({...newArrivals, [section]: e.target.value})}
                style={styles.input}
              />
              {currentContent.newArrivals && currentContent.newArrivals[section] && (
                <img src={`${currentContent.newArrivals[section].url}?${new Date().getTime()}`} alt={`Current Section ${section.toUpperCase()}`} style={styles.image} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.contentSection}>
        <h3>Exclusive Offer</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={exclusiveOffer}
          onChange={(e) => setExclusiveOffer(e.target.value)}
          style={styles.input}
        />
        {currentContent.exclusiveOffer && (
          <img src={`${currentContent.exclusiveOffer.url}?${new Date().getTime()}`} alt="Current Exclusive Offer" style={styles.image} />
        )}
      </div>

      <div style={styles.contentSection}>
        <h3>Pub Content</h3>
        <input
          type="text"
          placeholder="Product ID"
          value={pubContent}
          onChange={(e) => setPubContent(e.target.value)}
          style={styles.input}
        />
        {currentContent.pub && (
          <img src={`${currentContent.pub.url}?${new Date().getTime()}`} alt="Current Pub Content" style={styles.image} />
        )}
      </div>

      <button onClick={handleSubmit} style={styles.updateButton}>Update Homepage Content</button>
    </div>
  );
};

export default HomepageManagement;