import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';
import Spacer from './Spacer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching products with token:', token);
      const response = await axios.get('http://localhost:1274/api/products/seller/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched products:', response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:1274/api/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = async (e, productId) => {
    const selectedCategoryId = e.target.value;
    try {
      const response = await axios.get(`http://localhost:1274/api/subCategories/${selectedCategoryId}`);
      setSubcategories(response.data.subcategories || []);
      
      setProducts(products.map(product => 
        product.id === productId ? { ...product, category_id: selectedCategoryId, subcategory_id: '' } : product
      ));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleEditChange = (e, productId) => {
    const { name, value } = e.target;
    setProducts(products.map(product => 
      product.id === productId ? { ...product, [name]: value } : product
    ));
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
  };

  const handleSave = async (product) => {
    try {
      const updatedProduct = products.find(p => p.id === product.id);
      console.log('Saving product:', updatedProduct);
      const token = localStorage.getItem('token');
      
      const response = await axios.put(`http://localhost:1274/api/products/${updatedProduct.id}`, {
        name: updatedProduct.name,
        price: parseFloat(updatedProduct.price),
        quantity: parseInt(updatedProduct.quantity),
        subcategory_id: parseInt(updatedProduct.subcategory_id)
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Update response:', response.data);
  
      if (response.data.success) {
        setProducts(prevProducts => 
          prevProducts.map(p => p.id === updatedProduct.id ? response.data.product : p)
        );
        setEditingProduct(null);
      } else {
        console.error('Error updating product:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:1274/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={styles.container}>
      <SellerSidebar />
      <main style={styles.main}>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <span style={styles.navSeparator}>/</span>
          <span style={styles.navCurrent}>Product List</span>
        </nav>
        <h2 style={styles.title}>Your Pending Products</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {editingProduct === product.id ? (
                    <input
                      name="name"
                      value={product.name}
                      onChange={(e) => handleEditChange(e, product.id)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct === product.id ? (
                    <input
                      name="price"
                      type="number"
                      value={product.price}
                      onChange={(e) => handleEditChange(e, product.id)}
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>
                <td>
  {editingProduct === product.id ? (
    <select
      name="category_id"
      value={product.category_id || ''}
      onChange={(e) => handleCategoryChange(e, product.id)}
    >
      <option value="">Select a category</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  ) : (
    product.subcategory?.category?.name || 'N/A'
  )}
</td>
<td>
  {editingProduct === product.id ? (
    <select
      name="subcategory_id"
      value={product.subcategory_id || ''}
      onChange={(e) => handleEditChange(e, product.id)}
    >
      <option value="">Select a subcategory</option>
      {subcategories.map(subcategory => (
        <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
      ))}
    </select>
  ) : (
    product.subcategory?.name || 'N/A'
  )}
</td>
                <td>
                  {editingProduct === product.id ? (
                    <input
                      name="quantity"
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleEditChange(e, product.id)}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editingProduct === product.id ? (
                    <button style={styles.saveButton} onClick={() => handleSave(product)}>Save</button>
                  ) : (
                    <button style={styles.editButton} onClick={() => handleEdit(product)}>Edit</button>
                  )}
                  <button style={styles.deleteButton} onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Spacer />
      </main>
    </div>
  );
};





const styles = {

  saveButton: {
    padding: '5px 10px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  nav: {
    marginBottom: '20px',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
  },
  navSeparator: {
    margin: '0 5px',
    color: '#999',
  },
  navCurrent: {
    color: '#999',
  },
  main: {
    marginLeft: '15%', // Adjusted to match the sidebar width
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color: '#e74c3c',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductList;