module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('admin', [
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
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('admin', null, {});
    }
  };