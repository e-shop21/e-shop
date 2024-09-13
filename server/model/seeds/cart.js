module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('cart', [
        { user_id: 1, product_id: 1, quantity: 2 },
        { user_id: 2, product_id: 3, quantity: 1 },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('cart', null, {});
    }
  };