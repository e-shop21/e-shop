import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCategories, fetchSubcategories } from '../../api/api';
import './ProductSearch.css';

const ProductSearch = ({ onProductSelect, onProductDelete }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories([{ id: 'all', name: 'All' }, ...categoriesData]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      if (categoryId === 'all') {
        setSubcategories([{ id: 'all', name: 'All' }]);
      } else {
        const subcategoriesData = await fetchSubcategories(categoryId);
        setSubcategories([{ id: 'all', name: 'All' }, ...subcategoriesData]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1274/api/products/search', {
        params: {
          searchTerm,
          category: selectedCategory,
          subcategory: selectedSubcategory
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error searching products:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <div className="product-search">
      <div className="search-controls">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            loadSubcategories(e.target.value);
            setSelectedSubcategory('all');
          }}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="subcategory-select"
        >
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.images[0]?.url} alt={product.name} className="product-image" />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>ID: {product.id}</p>
              <button onClick={() => onProductSelect(product)} className="select-button">Select</button>
              <button onClick={() => onProductDelete(product.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;






