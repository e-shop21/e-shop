import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userBuyingRates, setUserBuyingRates] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPurchases, setUserPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1274/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users || []);
      fetchUserBuyingRates(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserBuyingRates = async (users) => {
    try {
      const token = localStorage.getItem('token');
      const rates = {};
      for (let user of users) {
        const response = await axios.get(`http://localhost:1274/api/admin/user-buying-rate/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        rates[user.id] = response.data.buyingRate;
      }
      setUserBuyingRates(rates);
    } catch (error) {
      console.error('Error fetching user buying rates:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1274/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const fetchUserPurchases = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:1274/api/admin/user-purchases/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserPurchases(response.data.userPurchases);
      setSelectedUser(selectedUser === userId ? null : userId);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    (user.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
      {filteredUsers.map(user => (
        <div key={user.id} style={styles.userCard}>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Email: {user.email}</p>
          <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>Delete User</button>
          <button onClick={() => fetchUserPurchases(user.id)} style={styles.viewButton}>
            {selectedUser === user.id ? 'Hide Purchases' : 'View Purchases'}
          </button>
          {userBuyingRates[user.id] !== undefined && (
            <p>Buying Rate: {userBuyingRates[user.id].toFixed(2)}%</p>
          )}
          {selectedUser === user.id && (
            <div style={styles.purchasesDropdown} onClick={() => setSelectedUser(null)}>
              <h4>User Purchases (Click to hide)</h4>
              {userPurchases.map(purchase => (
                <div key={purchase.id} style={styles.purchaseItem}>
                  <p>Product: {purchase.product.name}</p>
                  <p>Price: ${purchase.product.price}</p>
                  <p>Quantity: {purchase.quantity}</p>
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
  userCard: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
  },

  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },

  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  purchasesDropdown: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  purchaseItem: {
    borderBottom: '1px solid #eee',
    padding: '5px 0',
  },
};

export default UserManagement;