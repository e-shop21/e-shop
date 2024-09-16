import React from 'react';
import '../index.css';

const Carousel = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
          
            <div style={{
                gridColumn: 'span 2',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '16px'
            }}>
                <h2 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Categories</h2>
                <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                    <li>Women's Fashion</li>
                    <li>Men's Fashion</li>
                    <li>Electronics</li>
                   
                </ul>
            </div>

            <div style={{
                gridColumn: 'span 10',
                backgroundColor: 'black',
                color: 'white',
                padding: '32px'
            }}>
                <h1 style={{ fontSize: '2rem' }}>Up to 10% Off Voucher</h1>
                <p>Shop Now</p>
              
            </div>
        </div>
    );
};

export default Carousel;
