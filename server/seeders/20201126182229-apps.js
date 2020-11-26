'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Apps', [{
      id: 1,
      categoryId: 1,
      name: 'Test App A',
      price: 50.00,
      img_url: 'url.com',
      devId: 2,
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Apps', [{
      id: 2,
      categoryId: 2,
      name: 'Test App B',
      price: 40.00,
      img_url: 'url.com',
      devId: 2,
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Apps', [{
      id: 3,
      categoryId: 3,
      name: 'Test App C',
      price: 10.00,
      img_url: 'url.com',
      devId: 2,
      createdAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Apps', null, {});
  }
};