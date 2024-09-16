
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('user', [
        { firstName: 'Customer1', lastName: 'User1', email: 'user1@example.com', password: 'password123' },
        { firstName: 'Customer2', lastName: 'User2', email: 'user2@example.com', password: 'password123' },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('user', null, {});
    }
  };