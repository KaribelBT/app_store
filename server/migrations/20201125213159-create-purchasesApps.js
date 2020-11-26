'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PurchasesApps', {
      purchaseIdId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Purchases',
          key: 'id'
        }
      },
      appId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Apps',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }  
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PurchasesApps');
  }
};