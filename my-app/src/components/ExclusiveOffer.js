import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function ExclusiveOffer() {
  const [offer, setOffer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExclusiveOffer();
  }, []);

  const fetchExclusiveOffer = async () => {
    try {
      const response = await axios.get('http://localhost:1274/api/commercials/exclusive-offer');
      setOffer(response.data);
    } catch (error) {
      console.error('Error fetching exclusive offer:', error);
    }
  };

  const handleClick = () => {
    if (offer) {
      navigate(`/product/${offer.product_id}`);
    }
  };

  return (
    <section style={{
      margin: '32px auto', 
      backgroundColor: 'black',
      color: 'white',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      width: '80%', 
      height: '300px', 
      overflow: 'hidden'
    }}>
      <div style={{ flex: 1, paddingRight: '32px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>Exclusive Offer</h2>
        <p style={{ marginBottom: '16px' }}>Get up to 50% off on selected items</p>
        <button onClick={handleClick} style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500'
        }}>Shop Now</button>
      </div>
      <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
        <img 
          src={offer ? offer.url : "https://images-cdn.ispot.tv/ad/twlG/default-large.jpg"}
          alt="Exclusive offer" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center' 
          }} 
        />
      </div>
    </section>
  );
}

export default ExclusiveOffer;