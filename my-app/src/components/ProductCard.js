import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {product.image ? (
        <img src={product.image} alt={product.name} onError={(e) => {
          e.target.onerror = null;
          e.target.src = `/placeholder/${product.id}.jpg`;
        }} />
      ) : (
        <img src={`/placeholder/${product.id}.jpg`} alt={product.name} />
      )}
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