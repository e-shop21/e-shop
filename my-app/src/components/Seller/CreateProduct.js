import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';
import Spacer from './Spacer';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    subcategory: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios.get('http://localhost:1274/api/categories')
      .then((response) => {
        setCategories(response.data.categories || []);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct({ ...product, category: selectedCategory });

    // Fetch subcategories based on selected category
    axios.get(`http://localhost:1274/api/subCategories/${selectedCategory}`)
      .then((response) => {
        setSubcategories(response.data.subcategories || []);
      })
      .catch((error) => console.error('Error fetching subcategories:', error));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log('Selected files:', selectedFiles);
  
    const newImages = [...images, ...selectedFiles].slice(0, 4);
    setImages(newImages);
  
    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
    console.log('Image previews:', newPreviews);
  
    if (newImages.length > 4) {
      alert('You can only upload up to 4 images. Extra images have been discarded.');
    }

    
  };



  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

 const renderImagePreviews = () => {
  return imagePreviews.map((preview, index) => (
    <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src={preview} 
        alt={`Preview ${index + 1}`} 
        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }} 
      />
      <button 
        onClick={() => removeImage(index)} 
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer'
        }}
      >
        X
      </button>
    </div>
  ));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please log in to create a product.');
        return;
      }
  
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const sellerId = decodedToken.id;
      console.log('Seller ID:', sellerId);
  
      const productResponse = await axios.post('http://localhost:1274/api/products', {
        name: product.name,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
        subcategory_id: parseInt(product.subcategory),
        seller_id: sellerId,
        description: product.description,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log('Product created:', productResponse.data);
  
      const productId = productResponse.data.product.id;
  
      const imageUploadPromises = images.map(async (image, index) => {
        console.log(`Uploading image ${index + 1}...`);
        const base64Image = await convertToBase64(image);
        return axios.post('http://localhost:1274/api/images/upload', {
          base64Image,
          product_id: productId
        }, {
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
      });
  
      const imageResponses = await Promise.all(imageUploadPromises);
      console.log('Image upload responses:', imageResponses);
  
      alert('Product created successfully!');
      // Reset form or redirect to product list
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product: ' + (error.response?.data?.message || error.message));
    }
  };
  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div style={styles.container}>
      <SellerSidebar />
      <main style={styles.main}>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <span style={styles.navSeparator}>/</span>
          <span style={styles.navCurrent}>Create Product</span>
        </nav>
        <h2 style={styles.title}>Create New Product</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" value={product.name} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" value={product.price} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" value={product.quantity} onChange={handleChange} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select id="category" value={product.category} onChange={handleCategoryChange} style={styles.input} required>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="subcategory">Subcategory</label>
            <select id="subcategory" value={product.subcategory} onChange={handleChange} style={styles.input} required>
              <option value="">Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea id="description" value={product.description} onChange={handleChange} style={styles.textarea} required></textarea>
          </div>
          <div style={styles.formGroup}>
  <label htmlFor="images">Upload Images (Max 4)</label>
  <input type="file" id="images" multiple onChange={handleImageChange} style={styles.input} accept="image/*" />
  <div style={styles.imagePreviewContainer}>
    {renderImagePreviews()}
  </div>
</div>
          <button type="submit" style={styles.submitButton}>Create Product</button>
        </form>
        <Spacer />
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  nav: {
    marginBottom: '20px',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
  },
  navSeparator: {
    margin: '0 5px',
    color: '#999',
  },
  navCurrent: {
    color: '#999',
  },
  main: {
    marginLeft: '15%', 
    padding: '20px',
  },
  title: {
    color: '#e74c3c',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '100px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  imagePreviewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
};


export default CreateProduct;