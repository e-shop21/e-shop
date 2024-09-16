import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewArrivals() {
  const [sections, setSections] = useState({ a: null, b: null, c: null, d: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1274/api/commercials/new-arrivals');
      const newSections = { a: null, b: null, c: null, d: null };
      response.data.forEach(item => {
        const sectionKey = item.ref.slice(-1).toLowerCase();
        newSections[sectionKey] = item;
      });
      setSections(newSections);
      setError(null);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      setError('Failed to load new arrivals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const styles = {
    container: {
      margin: '2rem 0',
      paddingBottom: '2rem',
      backgroundColor: '#f7f7f7',
      padding: '2rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '400px 200px', // Changed to 2 rows
      gap: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    common: {
      backgroundColor: '#ffffff',
      padding: '1rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      overflow: 'hidden',
    },
    sectionA: {
      gridRow: 'span 2',
      height: '600px',
    },
    sectionB: {
      height: '400px', 
    },
    sectionCDContainer: {
      gridColumn: '2',
      gridRow: '2',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
    },
    sectionCD: {
      height: '200px'
    },
    name: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    image: {
      width: '100%',
      height: '70%', // Adjust this value to control image height
      objectFit: 'contain',
      borderRadius: '0.5rem',
    },
    price: {
      marginTop: '0.5rem',
      fontSize: '1rem',
    },
  };

  if (loading) return <div style={styles.container}>Loading new arrivals...</div>;
  if (error) return <div style={styles.container}>{error}</div>;

  return (
    <section style={styles.container}>
<h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left' }}>New Arrivals</h2>
      <div style={styles.grid}>
        <div style={{...styles.common, ...styles.sectionA}} onClick={() => handleClick(sections.a?.product_id)}>
          {sections.a ? (
            <>
              <h3 style={styles.name}>{sections.a.product.name}</h3>
              <img src={sections.a.url} alt={sections.a.product.name} style={styles.image} />
              <p style={styles.price}>${sections.a.product.price}</p>
            </>
          ) : (
            <h3 style={styles.name}>Section A</h3>
          )}
        </div>
        <div style={{...styles.common, ...styles.sectionB}} onClick={() => handleClick(sections.b?.product_id)}>
          {sections.b ? (
            <>
              <h3 style={styles.name}>{sections.b.product.name}</h3>
              <img src={sections.b.url} alt={sections.b.product.name} style={styles.image} />
              <p style={styles.price}>${sections.b.product.price}</p>
            </>
          ) : (
            <h3 style={styles.name}>Section B</h3>
          )}
        </div>
        <div style={styles.sectionCDContainer}>
          <div style={{...styles.common, ...styles.sectionCD}} onClick={() => handleClick(sections.c?.product_id)}>
            {sections.c ? (
              <>
                <h3 style={styles.name}>{sections.c.product.name}</h3>
                <img src={sections.c.url} alt={sections.c.product.name} style={styles.image} />
                <p style={styles.price}>${sections.c.product.price}</p>
              </>
            ) : (
              <h3 style={styles.name}>Section C</h3>
            )}
          </div>
          <div style={{...styles.common, ...styles.sectionCD}} onClick={() => handleClick(sections.d?.product_id)}>
            {sections.d ? (
              <>
                <h3 style={styles.name}>{sections.d.product.name}</h3>
                <img src={sections.d.url} alt={sections.d.product.name} style={styles.image} />
                <p style={styles.price}>${sections.d.product.price}</p>
              </>
            ) : (
              <h3 style={styles.name}>Section D</h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;