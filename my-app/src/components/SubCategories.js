import React, { useState, useEffect } from 'react';
import '../index.css';
import CategoryCard from './CategoryCard';
import { fetchSubcategories } from '../api/api';

function SubCategories({ selectedCategoryId, onSubCategorySelect }) {
  
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const loadSubcategories = async () => {
      if (selectedCategoryId) {
        const fetchedSubcategories = await fetchSubcategories(selectedCategoryId);
        setSubcategories(fetchedSubcategories);
      }
    };
    loadSubcategories();
  }, [selectedCategoryId]);

  return (
    <section className="browse-by-category-container">
      <h2 className="explore-products-heading">Subcategories</h2>
      <div className="category-row">
        {subcategories.map(subcategory => (
          <div key={subcategory.id} onClick={() => onSubCategorySelect(subcategory.id)}>
            <CategoryCard category={subcategory} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubCategories;