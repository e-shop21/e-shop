import React from 'react';

const SelectedProducts = ({ products, onProductRemove }) => {
  const styles = {
    selectedProducts: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
    },
    selectedProduct: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      textAlign: 'center',
    },
    productImage: {
      maxWidth: '100%',
      height: 'auto',
      marginBottom: '10px',
    },
    productInfo: {
      marginBottom: '10px',
    },
    button: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.selectedProducts}>
      {products.map(product => (
        <div key={product.id} style={styles.selectedProduct}>
          <img src={product.images[0]?.url} alt={product.name} style={styles.productImage} />
          <div style={styles.productInfo}>
            <h4>{product.name}</h4>
            <p>ID: {product.id}</p>
            <button onClick={() => onProductRemove(product.id)} style={styles.button}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedProducts;