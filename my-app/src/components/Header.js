import React from 'react';
import '../index.css';

function Header() {
  return (
    <header style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '8px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Welcome to our store</span>
      
      </div>
    </header>
  );
}

export default Header;
