import React from 'react';
import '../index.css';

function ExclusiveOffer() {
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
        <button style={{
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
          src="https://images-cdn.ispot.tv/ad/twlG/default-large.jpg" 
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