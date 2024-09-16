import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
        } else {
            fetchCartItems(token);
        }
    
        const handleClick = () => { setTimeout(() => {
            setErrorMessage('');
        }, 1000);
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [navigate]);

    const fetchCartItems = async (token) => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:1274/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const groupedItems = await Promise.all(response.data.carts.map(async (item) => {
                if (!item.product.images) {
                    const imageResponse = await axios.get(`http://localhost:1274/api/images/${item.product.id}`);
                    item.product.images = imageResponse.data.images;
                }
                return item;
            }));
    
            const groupedItemsMap = groupedItems.reduce((acc, item) => {
                if (!acc[item.product.id]) {
                    acc[item.product.id] = {
                        product: item.product,
                        quantity: 0,
                        cartIds: []
                    };
                }
                acc[item.product.id].quantity += item.quantity;
                acc[item.product.id].cartIds.push(item.id);
                return acc;
            }, {});
    
            for (const item of Object.values(groupedItemsMap)) {
                const productResponse = await axios.get(`http://localhost:1274/api/products/${item.product.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const availableQuantity = productResponse.data.product.quantity;
    
                if (item.quantity > availableQuantity) {
                    item.quantity = availableQuantity;
                    item.notification = `Only ${availableQuantity} items available`;
                }
            }
    
            setCartItems(Object.values(groupedItemsMap));
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setErrorMessage("Error fetching cart items");
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        const item = cartItems.find(item => item.product.id === productId);
        if (!item) return;
    
        if (newQuantity < 1) {
            setErrorMessage("Quantity cannot be less than 1");
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            if (newQuantity > item.quantity) {
                // Check product availability before adding to cart
                const productResponse = await axios.get(`http://localhost:1274/api/products/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const availableQuantity = productResponse.data.product.quantity;
    
                if (newQuantity > availableQuantity) {
                    setErrorMessage(`Only ${availableQuantity} items available`);
                    return;
                }
    
                // Adding to cart
                await axios.post('http://localhost:1274/api/cart', {
                    product_id: productId,
                    quantity: 1
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else if (newQuantity < item.quantity) {
                // Removing from cart
                const cartIdToRemove = item.cartIds[item.cartIds.length - 1];
                await axios.delete(`http://localhost:1274/api/cart/${cartIdToRemove}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            console.log(`Updated quantity for product ${productId} to ${newQuantity}`);
            fetchCartItems(token);
        } catch (error) {
            console.error('Error updating cart item:', error);
            setErrorMessage("Error updating cart item");
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:1274/api/cart/product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(`Deleted all instances of product ${productId} from cart`);
            fetchCartItems(token);
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            setErrorMessage("Error deleting product from cart");
        }
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            
            // Perform checkout
            await axios.post('http://localhost:1274/api/cart/checkout', 
                { cartItems },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // Create sold items
            for (const item of cartItems) {
                await axios.post('http://localhost:1274/api/sold/item', 
                    { 
                        product_id: item.product.id, 
                        quantity: item.quantity 
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
    
            setCartItems([]);
            console.log('Checkout successful and sold items created');
            setErrorMessage('Checkout successful!');
        } catch (error) {
            console.error('Error during checkout:', error);
            setErrorMessage("Error during checkout: " + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="container">
          
            
            <div className="table-container">
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.product.id}>
                            <td className="product">
                            <img 
    src={item.product.images && item.product.images.length > 0 ? item.product.images[0].url : `/placeholder/${item.product.id}.jpg`} 
    alt={item.product.name} 
    className="product-img" 
    onError={(e) => {
        e.target.onerror = null;
        e.target.src = `/placeholder/${item.product.id}.jpg`;
    }}
/>
                                {item.product.name}
                            </td>
                            <td>${item.product.price.toFixed(2)}</td>
                            <td>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                </div>
                            </td>
                            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => deleteProduct(item.product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
            <div className="checkout-container">
    <div className="coupon-section">
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
        <button className="checkout-btn" onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Proceed to checkout'}
        </button>
    </div>
</div>

            <style jsx="true">{`
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
    width: 220px; 
    height: 175px; 
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

    .checkout-btn:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .error-message {
    color: red;
    font-size: 2.5rem; 
    margin-bottom: 1rem;
    text-align: left; 
}
`}</style>
        </div>
    );
}