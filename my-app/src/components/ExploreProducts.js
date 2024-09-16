import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api/api';

function ExploreProducts() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const productsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

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

  const handleSeeAllProducts = () => {
    navigate('/category/1/1');
  };

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <section className="explore-products-container">
      <h2 className="explore-products-heading">Explore Our Products</h2>
      <div className="centered-container">
      <div className="product-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            width: '100%',
            maxWidth: '1200px',
          }}>
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>Prev</button>
        <button className="see-all-button" onClick={handleSeeAllProducts}>See All Our Products</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </section>
  );
}

export default ExploreProducts;