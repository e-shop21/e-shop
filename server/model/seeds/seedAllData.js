



const seedAllData = async (sequelize) => {
    // Seed Admin
    await bulkInsert('admin', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@example.com',
        password: 'admin123', // Hash this in production
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'admin2@example.com',
        password: 'admin123',
      },
    ]);
  
    // Seed Category
    await bulkInsert('category', [
      { name: 'Laptops' },
      { name: 'Smartphones' },
      { name: 'Tablets' },
      { name: 'Accessories' },
    ]);
  
    // Seed Seller
    await bulkInsert('seller', [
      { firstName: 'Alice', lastName: 'Wonder', email: 'alice@store.com', password: 'seller123' },
      { firstName: 'Bob', lastName: 'Builder', email: 'bob@store.com', password: 'seller123' },
    ]);
  
    // Seed User
    await bulkInsert('user', [
      { firstName: 'Customer1', lastName: 'User1', email: 'user1@example.com', password: 'password123' },
      { firstName: 'Customer2', lastName: 'User2', email: 'user2@example.com', password: 'password123' },
    ]);
  
    // Seed Product
    await bulkInsert('product', [
      { name: 'Gaming Laptop XYZ', price: 1500, quantity: 10, subcategory_id: 1, seller_id: 1 },
      { name: 'Business Laptop ABC', price: 1200, quantity: 5, subcategory_id: 2, seller_id: 1 },
      { name: 'Android Phone Model 1', price: 700, quantity: 30, subcategory_id: 3, seller_id: 2 },
      { name: 'iPhone Model 2', price: 999, quantity: 15, subcategory_id: 4, seller_id: 2 },
    ]);
    // Seed Cart
    await bulkInsert('cart', [
      { user_id: 1, product_id: 1, quantity: 2 },
      { user_id: 2, product_id: 3, quantity: 1 },
    ]);
  
    // Seed Wishlist
    await bulkInsert('wishlist', [
      { user_id: 1, product_id: 2 },
      { user_id: 2, product_id: 4 },
    ]);
  
    // Seed Sold
    await bulkInsert('sold', [
      { product_id: 1, quantity: 2, sold_at: new Date() },
      { product_id: 3, quantity: 1, sold_at: new Date() },
    ]);
  
    // Seed Image
    await bulkInsert('image', [
      { product_id: 1, url: 'https://example.com/images/gaming-laptop.jpg' },
      { product_id: 2, url: 'https://example.com/images/business-laptop.jpg' },
      { product_id: 3, url: 'https://example.com/images/android-phone.jpg' },
      { product_id: 4, url: 'https://example.com/images/iphone.jpg' },
    ]);
  };
  
  module.exports = {
    seedAllData
  };