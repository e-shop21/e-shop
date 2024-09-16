import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CategoryList from './CategoryList';
import SubCategoryDropdown from './SubCategoryDropdown';
import ProductCard from './ProductCard';
import WebsiteServices from './WebsiteServices';
import { fetchCategories, fetchSubcategories, fetchProductsByCategory, fetchProductsBySubcategory, fetchProductsBySearch } from '../api/api';

function CategoryPage() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 12;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
  
    const loadInitialData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      
      if (categoryId) {
        await handleCategorySelect(categoryId === 'all' ? 'all' : parseInt(categoryId), false);
        if (subCategoryId) {
          await handleSubCategorySelect(subCategoryId === 'all' ? 'all' : parseInt(subCategoryId), false);
        }
      } else {
        await handleCategorySelect('all', false);
      }

      if (location.state && location.state.searchResults) {
        setProducts(location.state.searchResults);
      } else if (search) {
        await fetchProducts(categoryId, subCategoryId, search);
      } else {
        await fetchProducts(categoryId, subCategoryId);
      }
    };
    loadInitialData();
  }, [location, categoryId, subCategoryId]);

  const handleCategorySelect = async (categoryId, shouldNavigate = true) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId('all');
    setCurrentPage(0);

    if (categoryId === 'all') {
      setSubcategories([{ id: 'all', name: 'All' }]);
    } else {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      setSubcategories([{ id: 'all', name: 'All' }, ...fetchedSubcategories]);
    }

    await fetchProducts(categoryId, 'all');
    if (shouldNavigate) {
      navigate(`/category/${categoryId}`);
    }
  };

  const handleSubCategorySelect = async (subCategoryId, shouldNavigate = true) => {
    setSelectedSubCategoryId(subCategoryId);
    setCurrentPage(0);
    await fetchProducts(selectedCategoryId, subCategoryId);
    if (shouldNavigate) {
      navigate(`/category/${selectedCategoryId}/${subCategoryId}`);
    }
  };

  const fetchProducts = async (categoryId, subCategoryId, search = '') => {
    let fetchedProducts;
    if (search) {
      fetchedProducts = await fetchProductsBySearch(search, categoryId, subCategoryId);
    } else if (subCategoryId && subCategoryId !== 'all') {
      fetchedProducts = await fetchProductsBySubcategory(subCategoryId);
    } else if (categoryId && categoryId !== 'all') {
      fetchedProducts = await fetchProductsByCategory(categoryId);
    } else {
      fetchedProducts = await fetchProductsByCategory('all');
    }
    setProducts(fetchedProducts);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', gap: '32px', marginBottom: '2rem' }}>
        <div style={{ width: '200px' }}>
          <CategoryList 
            categories={categories} 
            onCategorySelect={handleCategorySelect}
            selectedCategoryId={selectedCategoryId}
          />
          <SubCategoryDropdown 
            subcategories={subcategories} 
            onSubCategorySelect={handleSubCategorySelect}
            selectedSubCategoryId={selectedSubCategoryId}
            disabled={selectedCategoryId === 'all'}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div className="product-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination" style={{
        padding: '1rem',
        backgroundColor: '#f7f7f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>Prev</button>
        <span style={{ margin: '0 1rem' }}>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
      <WebsiteServices />
    </div>
  );
}

export default CategoryPage;