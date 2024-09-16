import React from 'react';

const ExclusiveOfferSection = ({ exclusiveOffer, setExclusiveOffer, onSubmit }) => {
  return (
    <div>
      <h3>Exclusive Offer</h3>
      <input
        type="text"
        placeholder="Product ID"
        value={exclusiveOffer}
        onChange={(e) => setExclusiveOffer(e.target.value)}
      />
      <button onClick={onSubmit}>Update Exclusive Offer</button>
    </div>
  );
};

export default ExclusiveOfferSection;