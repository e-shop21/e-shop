import React, { useEffect, useState } from 'react';
import '../index.css';
import ProductCard from './ProductCard';
import { products } from '../dummyData/products';
import { generateImageLinks } from '../utils/imageGenerator';

function FlashSales() {
  const [flashSalesProducts, setFlashSalesProducts] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);

  useEffect(() => {
    const selectedProducts = products.slice(0, 4);
    const generatedImageLinks = generateImageLinks(4);

    console.log('Selected products:', selectedProducts);
    console.log('Generated image links:', generatedImageLinks);

    setFlashSalesProducts(selectedProducts);
    setImageLinks(generatedImageLinks);
  }, []);

  return (
    <section className="flash-sales-container">
      <h2 className="flash-sales-heading">Flash Sales</h2>
      <div className="centered-container">
        <div className="product-row">
          {flashSalesProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={{...product, image: imageLinks[index]}} 
            />
          ))}
        </div>
      </div>
      <div className="pagination">
        <button className="see-all-button">See All Our Products</button>
      </div>
    </section>
  );
}

export default FlashSales;

























// import React, { useEffect, useState } from 'react';
// import '../index.css';
// import ProductCard from './ProductCard';
// import { products } from '../dummyData/products';
// import { generateImageLinks } from '../utils/imageGenerator';

// function FlashSales() {
//   const [flashSalesProducts, setFlashSalesProducts] = useState([]);
//   const [imageLinks, setImageLinks] = useState([]);

//   useEffect(() => {
//     const selectedProducts = products.slice(0, 4);
//     const generatedImageLinks = generateImageLinks(4);

//     console.log('Selected products:', selectedProducts);
//     console.log('Generated image links:', generatedImageLinks);

//     setFlashSalesProducts(selectedProducts);
//     setImageLinks(generatedImageLinks);
//   }, []);

//   return (
//     <section className="flash-sales-container">
//       <h2 className="flash-sales-heading">Flash Sales</h2>
//       <div className="centered-container">
//         <div className="product-row">
//           {flashSalesProducts.map((product, index) => (
//             <ProductCard 
//               key={product.id} 
//               product={{...product, image: imageLinks[index]}} 
//             />
//           ))}
//         </div>
//       </div>
//       <div className="pagination">
//         <button>Prev</button>
//         <button className="see-all-button">See All Our Products</button>
//         <button>Next</button>
//       </div>
//     </section>
//   );
// }

// export default FlashSales;