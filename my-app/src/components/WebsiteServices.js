import React from 'react';

function WebsiteServices() {
  const containerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '3rem 0',
    marginTop: '4rem',
  };

  const innerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const serviceStyle = {
    textAlign: 'center',
    maxWidth: '300px',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const descriptionStyle = {
    fontSize: '1rem',
    color: '#6c757d',
  };

  const headingStyle = {
    textAlign: 'center', 
    marginBottom: '2rem',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Services</h2> 
      <div style={innerContainerStyle}>
        <div style={serviceStyle}>
          <h3 style={titleStyle}>Free and Fast Delivery</h3>
          <p style={descriptionStyle}>Free delivery for all orders over $100</p>
        </div>
        <div style={serviceStyle}>
          <h3 style={titleStyle}>24/7 Customer Service</h3>
          <p style={descriptionStyle}>Friendly 24/7 customer support</p>
        </div>
        <div style={serviceStyle}>
          <h3 style={titleStyle}>Money Back Guarantee</h3>
          <p style={descriptionStyle}>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
}

export default WebsiteServices;