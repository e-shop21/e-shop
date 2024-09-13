import React, { useState, useEffect } from 'react';
import '../index.css';
import ProductCard from './ProductCard';
import { products } from '../dummyData/products';
import { generateImageLinks } from '../utils/imageGenerator';

function BestSelling() {
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLinks, setImageLinks] = useState([]);
  const productsPerPage = 4;
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

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <section className="best-selling-container">
      <h2 className="best-selling-heading">Best Selling Products</h2>
      <div className="centered-container">
        <div className="product-row">
          {displayedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={{...product, image: imageLinks[startIndex + index]}} 
            />
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>Prev</button>
        <button className="see-all-button">See All Our Products</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </section>
  );
}

export default BestSelling;