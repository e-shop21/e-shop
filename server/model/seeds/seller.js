module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('seller', [
        { firstName: 'Alice', lastName: 'Wonder', email: 'alice@store.com', password: 'seller123' },
        { firstName: 'Bob', lastName: 'Builder', email: 'bob@store.com', password: 'seller123' },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('seller', null, {});
    }
  };