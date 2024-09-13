import React from 'react';
import '../index.css';

function SubCategoryDropdown({ selectedCategoryId, onSubCategorySelect }) {
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
    <div className="subcategory-dropdown">
      <h2 className="explore-products-heading"></h2>
      <ul>
        {filteredSubcategories.map(subcategory => (
          <li key={subcategory.id} onClick={() => onSubCategorySelect(subcategory.id)}>
            {subcategory.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubCategoryDropdown;