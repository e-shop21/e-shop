import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const OneProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    fetchProductDetails();

    const handleClick = () => { setTimeout(() => {
      setErrorMessage('');
  }, 1000);
  };

    document.addEventListener('click', handleClick);

    return () => {
        document.removeEventListener('click', handleClick);
    };
}, [productId]);

  const fetchProductDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const [productResponse, wishlistResponse] = await Promise.all([
      axios.get(`http://localhost:1274/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('http://localhost:1274/api/wishlist/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    setProduct(productResponse.data.product);
    setAvailableQuantity(productResponse.data.product.quantity);
    setSelectedColor(productResponse.data.product.colors?.[0] || '');
    setSelectedSize(productResponse.data.product.sizes?.[0] || '');

    const isProductInWishlist = wishlistResponse.data.wishlists.some(
      item => item.product_id === productId
    );
    setIsInWishlist(isProductInWishlist);
  } catch (error) {
    console.error('Error fetching product details:', error);
    setErrorMessage("Error fetching product details");
  }
};











  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      setErrorMessage("Quantity cannot be less than 1");
      return;
    }
    if (newQuantity > availableQuantity) {
      setErrorMessage(`Only ${availableQuantity} items available`);
      return;
    }
    setQuantity(newQuantity);
    setErrorMessage('');
  };

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem('token');
      for (let i = 0; i < quantity; i++) {
        await axios.post('http://localhost:1274/api/cart', {
          product_id: productId,
          quantity: 1
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      console.log(`Added ${quantity} of product ${productId} to cart`);
      setErrorMessage('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setErrorMessage("Error adding product to cart");
    }
  };




  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Please sign in to add to wishlist');
        return;
      }
  
      const endpoint = isInWishlist
        ? `http://localhost:1274/api/wishlist/remove/${productId}`
        : 'http://localhost:1274/api/wishlist';
  
      const method = isInWishlist ? 'delete' : 'post';
  
      // Decode the token to get the user ID
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.id;
  
      await axios({
        method,
        url: endpoint,
        headers: { Authorization: `Bearer ${token}` },
        data: isInWishlist ? {} : { user_id: userId, product_id: productId }
      });
  
      setIsInWishlist(!isInWishlist);
      setErrorMessage(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      console.error('Error updating wishlist:', error);
      setErrorMessage('Error updating wishlist');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const rating = Number.isInteger(product.rating) ? product.rating : 0;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 3fr', 
        gridTemplateRows: 'repeat(3, 1fr)', 
        gap: '0.5rem', 
        width: '633.6px',
        height: '440px',
        border: '1px solid black', 
        boxSizing: 'border-box',
        padding: '0.5rem',
        marginTop: '79.2px'
      }}>
        {product.images && product.images.slice(0, 3).map((image, index) => (
          <div key={index} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <img src={image.url} alt={`Product ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
        <div style={{ 
          gridColumn: '2', 
          gridRow: '1 / span 3', 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden'
        }}>
          <img 
            src={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder/default.jpg'} 
            alt="Main Product" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>
      
      <div style={{ flex: '1', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{product.name}</h1>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', color: '#ecc94b' }}>
            {[...Array(rating)].map((_, i) => (
              <svg key={i} style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <svg key={i} style={{ width: '1.25rem', height: '1.25rem', color: '#cbd5e0' }} viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span style={{ marginLeft: '0.5rem', color: '#718096' }}>({product.reviews} Reviews)</span>
          <span style={{ marginLeft: '1rem', color: '#48bb78' }}>{product.stockStatus}</span>
        </div>
        
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>${product.price}</p>
        
        <p style={{ marginBottom: '1rem' }}>{product.description}</p>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Colours:</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {product.colors?.map((color) => (
              <button key={color} onClick={() => setSelectedColor(color)} style={{ width: '2rem', height: '2rem', borderRadius: '9999px', backgroundColor: color, border: selectedColor === color ? '2px solid black' : '2px solid #e2e8f0' }}></button>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Size:</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: '0.25rem 0.75rem',
                  border: selectedSize === size ? '2px solid black' : '2px solid #e2e8f0',
                  backgroundColor: selectedSize === size ? 'black' : 'transparent',
                  color: selectedSize === size ? 'white' : 'black',
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
            <button onClick={() => updateQuantity(quantity - 1)} style={{ padding: '0.25rem 0.75rem', fontSize: '1.25rem' }}>-</button>
            <span style={{ padding: '0.25rem 0.75rem' }}>{quantity}</span>
            <button onClick={() => updateQuantity(quantity + 1)} style={{ padding: '0.25rem 0.75rem', fontSize: '1.25rem' }}>+</button>
          </div>
          <button onClick={handleBuyNow} style={{ marginLeft: '1rem', backgroundColor: '#f56565', color: 'white', padding: '0.5rem 2rem', borderRadius: '0.375rem' }}>Buy Now</button>
          <button onClick={handleWishlist} style={{ marginLeft: '1rem', border: '1px solid black', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}>
  <svg style={{ width: '1.5rem', height: '1.5rem', fill: isInWishlist ? 'red' : 'none', stroke: 'currentColor' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
</button>
        </div>
        
        {errorMessage && <p style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</p>}
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Free Delivery</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#718096' }}>Enter your Postal code for Delivery Availability</p>
        </div>
        
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m9 2.667A10 10 0 11.62 10.64 10 10 0 0122 17.333z" />
            </svg>
            <span>Return Delivery</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#718096' }}>Free 30 Days Delivery Returns.</p>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;