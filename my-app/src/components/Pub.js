// components/Pub.js
import React from 'react';
import '../index.css';
function Pub() {
  return (
    <section style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '80px 16px', // Increased vertical padding for more height
      margin: '32px auto',
      width: '70%',
      maxWidth: '1200px',
      boxSizing: 'border-box',
      minHeight: '400px', // Set a minimum height for the Pub
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
        height: '100%', // Ensure the inner content uses full height of the section
      }}>
        <div style={{
          flex: '1',
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>iPhone 14 Series</h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '24px'
          }}>Up to 10% off Voucher</p>
          <button style={{
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
  src="https://jdcorporateblog.com/wp-content/uploads/2022/09/iphone-poster-1.jpg"
  alt="iPhone 14" 
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
  )}

  export default Pub;