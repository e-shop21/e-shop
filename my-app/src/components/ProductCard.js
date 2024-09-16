import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('/placeholder/default.jpg');

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setImageUrl(product.images[0].url);
    } else {
      setImageUrl(`/placeholder/${product.id}.jpg`);
    }
  }, [product]);

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      try {
        const response = await axios.post('http://localhost:1274/api/cart', {
          product_id: product.id,
          quantity: 1
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Added to cart:', response.data);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img 
        src={imageUrl} 
        alt={product.name} 
        onError={() => setImageUrl(`/placeholder/${product.id}.jpg`)}
      />
      <h3>{product.name}</h3>
      <div className="price-container">
        <span className="price">${product.price}</span>
        {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
      </div>
      <div className="rating-container">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < (product.rating || 0) ? 'filled' : ''}`}>★</span>
        ))}
        <span className="reviews">({product.reviews || 0})</span>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;