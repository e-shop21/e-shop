import React from 'react';
import '../index.css';

function SubCategoryDropdown({ subcategories, onSubCategorySelect, selectedSubCategoryId }) {
  return (
    <div className="subcategory-dropdown">
      <h2 className="explore-products-heading">Subcategories</h2>
      <ul>
        {subcategories.map(subcategory => (
          <li 
            key={subcategory.id} 
            onClick={() => onSubCategorySelect(subcategory.id)}
            style={{
              backgroundColor: subcategory.id === selectedSubCategoryId ? '#e2e8f0' : 'transparent',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            {subcategory.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubCategoryDropdown;