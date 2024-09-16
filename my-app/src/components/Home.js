import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import Pub from './Pub';
import SubCategories from './SubCategories';
import ExclusiveOffer from './ExclusiveOffer';
import ExploreProducts from './ExploreProducts';
import NewArrivals from './NewArrivals';
import WebsiteServices from './WebsiteServices';
import { fetchCategories } from '../api/api';
import BestSelling from './BestSelling';


function Home() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setSelectedCategoryId(fetchedCategories[0].id);
      }
    };
    loadCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSubCategorySelect = (subCategoryId) => {
    navigate(`/category/${selectedCategoryId}/${subCategoryId}`);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px'
      }}>
        <Category 
          categories={categories} 
          onCategorySelect={handleCategorySelect} 
          selectedCategoryId={selectedCategoryId}
        />
        <Pub />
      </div>
      <SubCategories selectedCategoryId={selectedCategoryId} onSubCategorySelect={handleSubCategorySelect} />
      <ExclusiveOffer />
      {/* <BestSelling /> */}
      <ExploreProducts />
      <NewArrivals />
      <WebsiteServices />
     
    </div>
  );
}

export default Home;