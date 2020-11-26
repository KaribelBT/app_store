'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'clienttest@gmail.com',
      password:  await bcrypt.hash(`123456789`,10),
      isDev: false,
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Users', [{
      id: 2,
      email: 'devtest@gmail.com',
      password:  await bcrypt.hash(`123456789`,10),
      isDev: true,
      createdAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
