import React from 'react';
import '../index.css';


function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <h3>{category.name}</h3>
    </div>
  );
}

export default CategoryCard;