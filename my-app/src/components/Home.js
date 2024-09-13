import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import Pub from './Pub';
import FlashSales from './FlashSales';
import SubCategories from './SubCategories';
import BestSelling from './BestSelling';
import ExclusiveOffer from './ExclusiveOffer';
import ExploreProducts from './ExploreProducts';
import NewArrivals from './NewArrivals';
import WebsiteServices from './WebsiteServices';

function Home() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);

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
        <Category onCategorySelect={handleCategorySelect} />
        <Pub />
      </div>
      {/* <FlashSales /> */}
      <SubCategories selectedCategoryId={selectedCategoryId} onSubCategorySelect={handleSubCategorySelect} />
      {/* <BestSelling /> */}
      <ExclusiveOffer />
      <ExploreProducts />
      <NewArrivals />
      <WebsiteServices />
    </div>
  );
}

export default Home;