'use strict'
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    static associate(models) {
      Purchases.belongsTo(models.Fops, {
        foreignKey: {
          name: "fopId",
          allowNull: false,
        },
      }); 
      Purchases.belongsTo(models.Users, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });     
      Purchases.belongsToMany(models.Apps, {
        through: "PurchasesApps",
        as: "apps",
        foreignKey: {
          name: "purchaseId",
          allowNull: false,
        }
      });
    }
  }
  Purchases.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fopId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Purchases",
    }
  );
  return Purchases;
};