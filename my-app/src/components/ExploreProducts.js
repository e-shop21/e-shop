import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import ProductCard from './ProductCard';
import { products } from '../dummyData/products';
import { generateImageLinks } from '../utils/imageGenerator';

function ExploreProducts() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLinks, setImageLinks] = useState([]);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const generatedImageLinks = generateImageLinks(products.length);
    setImageLinks(generatedImageLinks);
  }, []);

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
    navigate('/category/1/1'); // Navigate to the first category and subcategory
  };

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <section className="explore-products-container">
      <h2 className="explore-products-heading">Explore Our Products</h2>
      <div className="centered-container">
        {Array.from({ length: 2 }).map((_, rowIndex) => (
          <div key={rowIndex} className="product-row">
            {currentProducts.slice(rowIndex * 4, (rowIndex + 1) * 4).map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={{...product, image: imageLinks[startIndex + (rowIndex * 4) + index]}} 
              />
            ))}
          </div>
        ))}
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