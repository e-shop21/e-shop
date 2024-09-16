import React from 'react';

function Category({ categories, onCategorySelect, selectedCategoryId }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      padding: '16px',
      width: '200px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      {categories.map(category => (
        <div 
          key={category.id} 
          style={{
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: selectedCategoryId === category.id ? '#f0f0f0' : 'white',
            borderRadius: '4px'
          }}
          onClick={() => onCategorySelect(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}

export default Category;