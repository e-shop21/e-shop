import React from 'react';
import '../index.css';


function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <img src={category.image} alt={category.name} className="category-image" />
      <h3>{category.name}</h3>
    </div>
  );
}

export default CategoryCard;