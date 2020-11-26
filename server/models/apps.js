'use strict'
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Apps extends Model {
    static associate(models) {
      Apps.belongsTo(models.Categories, {
        foreignKey: {
          name: "categoryId",
          allowNull: false,
        },
      });
      Apps.belongsTo(models.Users, {
        foreignKey: {
          name: "devId",
          allowNull: false,
        },
      });
      Apps.belongsToMany(models.Purchases, {
        through: "PurchasesApps",
        as: "purchases",
        foreignKey: {
          name: "appId",
          allowNull: false,
        }
      });
    }
  }
  Apps.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      img_url: DataTypes.STRING,
      devId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Apps",
    }
  );
  return Apps;
};