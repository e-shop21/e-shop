module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('image', [
        { product_id: 1, url: 'https://example.com/images/gaming-laptop.jpg' },
        { product_id: 2, url: 'https://example.com/images/business-laptop.jpg' },
        { product_id: 3, url: 'https://example.com/images/android-phone.jpg' },
        { product_id: 4, url: 'https://example.com/images/iphone.jpg' },
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('image', null, {});
    }
  };