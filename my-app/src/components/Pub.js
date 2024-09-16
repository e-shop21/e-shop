import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Pub() {
  const [pub, setPub] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPub();
  }, []);

  const fetchPub = async () => {
    try {
      const response = await axios.get('http://localhost:1274/api/commercials/pub');
      setPub(response.data);
    } catch (error) {
      console.error('Error fetching pub:', error);
    }
  };

  const handleClick = () => {
    if (pub && pub.product_id) {
      navigate(`/product/${pub.product_id}`);
    }
  };

  const defaultImage = "https://jdcorporateblog.com/wp-content/uploads/2022/09/iphone-poster-1.jpg";

  return (
    <section style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '80px 16px',
      margin: '32px auto',
      width: '70%',
      maxWidth: '1200px',
      boxSizing: 'border-box',
      minHeight: '400px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
        height: '100%',
      }}>
        <div style={{
          flex: '1',
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>{pub?.product?.name || 'Featured Product'}</h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '24px'
          }}>{pub?.product?.description || 'Check out our latest offer'}</p>
          <button onClick={handleClick} style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '8px 24px',
            borderRadius: '9999px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}>
            Shop Now
          </button>
        </div>
        <div style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img 
            src={pub?.url || defaultImage}
            alt={pub?.product?.name || "Featured Product"} 
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Pub;