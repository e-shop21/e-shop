module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('product', [
        { name: 'Gaming Laptop XYZ', price: 1500, quantity: 10, subcategory_id: 1, seller_id: 1 },
        { name: 'Business Laptop ABC', price: 1200, quantity: 5, subcategory_id: 2, seller_id: 1 },
        { name: 'Android Phone Model 1', price: 700, quantity: 30, subcategory_id: 3, seller_id: 2 },
        { name: 'iPhone Model 2', price: 999, quantity: 15, subcategory_id: 4, seller_id: 2 },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('product', null, {});
    }
  };