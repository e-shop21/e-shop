import React from 'react';
import SubCategoryDropdown from './SubCategoryDropdown';

function Category({ onCategorySelect, selectedCategoryId, showSubCategories, onSubCategorySelect }) {
  const categories = [
    { id: 1, name: 'Laptops' },
    { id: 2, name: 'Smartphones' },
    { id: 3, name: 'Tablets' },
    { id: 4, name: 'Accessories' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      padding: '16px',
      width: '200px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto', 
    }}>
      {categories.map((category) => (
        <div key={category.id}>
          <div 
            style={{
              padding: '12px 16px', 
              backgroundColor: category.id === selectedCategoryId ? '#e2e8f0' : '#f7fafc',
              borderRadius: '4px',
              textAlign: 'center',
              margin: '2px 0',
              cursor: 'pointer',
            }}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </div>
          {showSubCategories && selectedCategoryId === category.id && (
            <SubCategoryDropdown
              selectedCategoryId={category.id}
              onSubCategorySelect={onSubCategorySelect}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Category;