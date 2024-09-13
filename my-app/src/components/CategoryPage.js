import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Category from './Category';
import SubCategoryDropdown from './SubCategoryDropdown';
import ProductCard from './ProductCard';
import { products } from '../dummyData/products';
import WebsiteServices from './WebsiteServices';


function CategoryPage() {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(parseInt(categoryId));
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(parseInt(subCategoryId));
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    setSelectedCategoryId(parseInt(categoryId));
    setSelectedSubCategoryId(parseInt(subCategoryId));
    setCurrentPage(0);
  }, [categoryId, subCategoryId]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(null);
  };

  const handleSubCategorySelect = (subCategoryId) => {
    setSelectedSubCategoryId(subCategoryId);
    navigate(`/category/${selectedCategoryId}/${subCategoryId}`);
  };

  const filteredProducts = selectedSubCategoryId
    ? products.filter(product => product.subCategoryId === selectedSubCategoryId)
    : products.filter(product => product.categoryId === selectedCategoryId);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '2rem' }}>
        <div style={{ width: '200px' }}>
          <Category onCategorySelect={handleCategorySelect} />
          <SubCategoryDropdown selectedCategoryId={selectedCategoryId} onSubCategorySelect={handleSubCategorySelect} />
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
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>Prev</button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
          </div>
        </div>
      </div>
      <WebsiteServices />
    </div>
  );
}

export default CategoryPage;