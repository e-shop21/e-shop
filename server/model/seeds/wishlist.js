module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('wishlist', [
        { user_id: 1, product_id: 2 },
        { user_id: 2, product_id: 4 },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('wishlist', null, {});
    }
  };