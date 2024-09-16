module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('subcategory', [
        { name: 'Gaming Laptops', category_id: 1 },
        { name: 'Business Laptops', category_id: 1 },
        { name: 'Android Phones', category_id: 2 },
        { name: 'iPhones', category_id: 2 },
        { name: 'iPads', category_id: 3 },
        { name: 'Smartwatches', category_id: 4 },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('subcategory', null, {});
    }
  };