import React, { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'LCD Monitor', price: 650, quantity: 1 },
    { id: 2, name: 'H2 Gaming Controller', price: 550, quantity: 2 }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="breadcrumbs">
        <ul>
          <li><a href="#">Home</a></li>
          <li>Cart</li>
        </ul>
      </div>
      
      <div className="table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="product">
                  <img src={`/api/placeholder/50/50?text=${item.name}`} alt={item.name} className="product-img" />
                  {item.name}
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="checkout-container">
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" className="coupon-input" />
          <button className="apply-coupon-btn">Apply Coupon</button>
        </div>
        
        <div className="cart-total">
          <h3>Cart Total</h3>
          <div className="totals">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="totals">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="totals total-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to checkout</button>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .breadcrumbs ul {
          display: flex;
          gap: 0.5rem;
          list-style-type: none;
        }

        .breadcrumbs a {
          text-decoration: none;
          color: blue;
        }

        .table-container {
          overflow-x: auto;
          margin-bottom: 2rem;
        }

        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }

        .cart-table th,
        .cart-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .product {
          display: flex;
          align-items: center;
        }

        .product-img {
          margin-right: 1rem;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 80px;
        }

        .quantity-control button {
          padding: 0.5rem;
          cursor: pointer;
        }

        .checkout-container {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .coupon-section {
          flex: 1;
        }

        .coupon-input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .apply-coupon-btn {
          width: 100%;
          background-color: #ff5252;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .cart-total {
          flex: 1;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .cart-total h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .totals {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .total-bold {
          font-weight: bold;
        }

        .checkout-btn {
          width: 100%;
          background-color: #ff5252;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
