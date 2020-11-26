'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Fops', [{
      id: 1,
      name: "Debit",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Fops', [{
      id: 2,
      name: "Credit",
      createdAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Fops', null, {});
  }
};
