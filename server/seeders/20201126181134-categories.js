'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
      id: 1,
      name: "LIFESTYLE",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 2,
      name: "SOCIAL MEDIA",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 3,
      name: "UTILITY",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 4,
      name: "GAMES/ENTERTAINMENT",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 5,
      name: "PRODUCTIVITY",
      createdAt: new Date
    }], {});
    await queryInterface.bulkInsert('Categories', [{
      id: 6,
      name: "NEWS/INFORMATION",
      createdAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
