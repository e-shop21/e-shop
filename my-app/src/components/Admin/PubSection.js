import React from 'react';

const PubSection = ({ pubContent, setPubContent, onSubmit }) => {
  return (
    <div>
      <h3>Pub Content</h3>
      <input
        type="text"
        placeholder="Product ID"
        value={pubContent}
        onChange={(e) => setPubContent(e.target.value)}
      />
      <button onClick={onSubmit}>Update Pub Content</button>
    </div>
  );
};

export default PubSection;