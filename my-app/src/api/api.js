import axios from 'axios';

const API_URL = 'http://localhost:1274/api';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data.categories;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};

export const fetchSubcategories = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/subcategories/${categoryId}`);
        return response.data.subcategories;
    } catch (error) {
        console.error(`Failed to fetch subcategories for category ${categoryId}:`, error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data.products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const fetchProductsBySubcategory = async (subcategoryId) => {
    try {
        const response = await axios.get(`${API_URL}/products/subcategory/${subcategoryId}`);
        return response.data.products;
    } catch (error) {
        console.error(`Failed to fetch products for subcategory ${subcategoryId}:`, error);
        throw error;
    }
};

export const fetchProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/products/category/${categoryId}`);
        return response.data.products;
    } catch (error) {
        console.error(`Failed to fetch products for category ${categoryId}:`, error);
        throw error;
    }
};

export const fetchProductsBySearch = async (searchTerm, categoryId = 'all', subCategoryId = 'all') => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      if (categoryId && categoryId !== 'all') params.append('category', categoryId);
      if (subCategoryId && subCategoryId !== 'all') params.append('subcategory', subCategoryId);
  
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/products/search`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.products;
    } catch (error) {
      console.error('Failed to fetch products by search:', error);
      throw error;
    }
  };