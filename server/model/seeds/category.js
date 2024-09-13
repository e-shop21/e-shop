
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('category', [
        { name: 'Laptops' },
        { name: 'Smartphones' },
        { name: 'Tablets' },
        { name: 'Accessories' },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('category', null, {});
    }
  };