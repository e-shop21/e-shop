module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('sold', [
        { product_id: 1, quantity: 2, sold_at: new Date() },
        { product_id: 3, quantity: 1, sold_at: new Date() },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('sold', null, {});
    }
  };