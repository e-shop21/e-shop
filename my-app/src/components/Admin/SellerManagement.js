import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [sellerStats, setSellerStats] = useState({});
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerProducts, setSellerProducts] = useState({ pending: [], sold: [] });
  const [viewType, setViewType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1274/api/sellers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSellers(response.data.sellers || []);
      fetchSellerStats(response.data.sellers);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const fetchSellerStats = async (sellers) => {
    try {
      const token = localStorage.getItem('token');
      const stats = {};
      for (let seller of sellers) {
        const response = await axios.get(`http://localhost:1274/api/admin/seller-stats/${seller.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        stats[seller.id] = response.data;
      }
      setSellerStats(stats);
    } catch (error) {
      console.error('Error fetching seller stats:', error);
    }
  };

  const deleteSeller = async (sellerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1274/api/sellers/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSellers();
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };
  const fetchSellerProducts = async (sellerId, type) => {
    if (selectedSeller === sellerId && viewType === type) {
      setSelectedSeller(null);
      setViewType(null);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
  
      let response;
      if (type === 'pending') {
        response = await axios.get(`http://localhost:1274/api/products/admin/seller/${sellerId}/pending`, { headers });
        setSellerProducts(prev => ({ ...prev, pending: response.data.products || [] }));
      } else if (type === 'sold') {
        response = await axios.get(`http://localhost:1274/api/products/admin/seller/${sellerId}/sold`, { headers });
        setSellerProducts(prev => ({ ...prev, sold: response.data.soldItems || [] }));
      }
  
      setSelectedSeller(sellerId);
      setViewType(type);
    } catch (error) {
      console.error(`Error fetching seller ${type} products:`, error);
      setSellerProducts(prev => ({ ...prev, [type]: [] }));
    }
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSellers = sellers.filter(seller =>
    (seller.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (seller.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (seller.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>Seller Management</h2>
      <input
        type="text"
        placeholder="Search sellers..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      {filteredSellers.map(seller => (
        <div key={seller.id} style={styles.sellerCard}>
          <h3>{seller.firstName} {seller.lastName}</h3>
          <p>Email: {seller.email}</p>
          {sellerStats[seller.id] && (
            <div>
              <p>Selling Rate: {sellerStats[seller.id].sellingRate.toFixed(2)}%</p>
              <p>Product Contribution Rate: {sellerStats[seller.id].productContributionRate.toFixed(2)}%</p>
            </div>
          )}
          <button onClick={() => fetchSellerProducts(seller.id, 'pending')} style={styles.viewButton}>
            {selectedSeller === seller.id && viewType === 'pending' ? 'Hide Pending Products' : 'View Pending Products'}
          </button>
          <button onClick={() => fetchSellerProducts(seller.id, 'sold')} style={styles.viewButton}>
            {selectedSeller === seller.id && viewType === 'sold' ? 'Hide Sold Products' : 'View Sold Products'}
          </button>
          <button onClick={() => deleteSeller(seller.id)} style={styles.deleteButton}>Delete Seller</button>
          {selectedSeller === seller.id && viewType === 'pending' && (
            <div style={styles.productsDropdown} onClick={() => { setSelectedSeller(null); setViewType(null); }}>
              <h4>Pending Products (Click to hide)</h4>
              {sellerProducts.pending.map(product => (
                <div key={product.id} style={styles.productItem}>
                  <p>Name: {product.name}</p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              ))}
            </div>
          )}
          {selectedSeller === seller.id && viewType === 'sold' && (
            <div style={styles.productsDropdown} onClick={() => { setSelectedSeller(null); setViewType(null); }}>
              <h4>Sold Products (Click to hide)</h4>
              {sellerProducts.sold.map(item => (
                <div key={item.id} style={styles.productItem}>
                  <p>Product: {item.product.name}</p>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity Sold: {item.quantity}</p>
                  <h5>Buyer</h5>
                  <p>Name: {item.user.firstName} {item.user.lastName}</p>
                  <p>Email: {item.user.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  sellerCard: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
  },
  viewButton: {
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  productsDropdown: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  productItem: {
    borderBottom: '1px solid #eee',
    padding: '5px 0',
  },
};

export default SellerManagement;
