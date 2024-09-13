import React from 'react';
import '../index.css';
import CategoryCard from './CategoryCard';

function SubCategories({ selectedCategoryId, onSubCategorySelect }) {
  const subcategories = [
    { id: 1, name: 'Gaming Laptops', category_id: 1 },
    { id: 2, name: 'Business Laptops', category_id: 1 },
    { id: 3, name: 'Android Phones', category_id: 2 },
    { id: 4, name: 'iPhones', category_id: 2 },
    { id: 5, name: 'iPads', category_id: 3 },
    { id: 6, name: 'Smartwatches', category_id: 4 },
  ];

  const filteredSubcategories = subcategories.filter(sub => sub.category_id === selectedCategoryId);

  return (
    <section className="browse-by-category-container">
      <h2 className="explore-products-heading">Subcategories</h2>
      <div className="category-row">
        {filteredSubcategories.map(subcategory => (
          <div key={subcategory.id} onClick={() => onSubCategorySelect(subcategory.id)}>
            <CategoryCard category={subcategory} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubCategories;