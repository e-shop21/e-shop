import React, { useState } from 'react';
import ProductCard from './ProductCard';





function BestSelling() {


const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    image: 'product1.jpg'
  },
]


  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

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
          {displayedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
      <button className="see-all-button">See All Our Products</button>
    </section>
  );
}

export default BestSelling;