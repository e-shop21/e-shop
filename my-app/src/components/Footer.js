import React from 'react';
import '../index.css';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white', padding: '48px 0' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '32px'
      }}>
        <div>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '16px' }}>Exclusive</h3>
          <p>Subscribe to our newsletter</p>
          <div style={{ marginTop: '16px', display: 'flex' }}>
            <input 
              type="email" 
              placeholder="Your email" 
              style={{
                border: '1px solid #555',
                padding: '8px',
                borderRadius: '4px 0 0 4px',
                flex: '1',
                color: 'black'
              }} 
            />
            
          </div>
        </div>
        <div>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '16px' }}>Support</h3>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0', lineHeight: '1.6' }}>
            <li>Tunisia , Ariana , techno-Pole</li>
            <li>RBK@gmail.com</li>
            <li>+1 234 567 8900</li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '16px' }}>Account</h3>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0', lineHeight: '1.6' }}>
            <li><a href="/account" style={{ color: 'white', textDecoration: 'none' }}>My Account</a></li>
            <li><a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login / Register</a></li>
            <li><a href="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</a></li>
            <li><a href="/wishlist" style={{ color: 'white', textDecoration: 'none' }}>Wishlist</a></li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '16px' }}>Quick Link</h3>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0', lineHeight: '1.6' }}>
            <li><a href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="/terms" style={{ color: 'white', textDecoration: 'none' }}>Terms of Use</a></li>
            <li><a href="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
        borderTop: '1px solid #333',
        textAlign: 'center'
      }}>
        <p>&copy; 2024 Exclusive. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
