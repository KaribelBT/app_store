'use strict'
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fops extends Model {
    static associate(models) {
      Fops.hasMany(models.Purchases,
        {
          onDelete: "NO ACTION",
          onUpdate: "NO ACTION",
        },
        {
          foreignKey: {
            name: "fopId",
            allowNull: false,
          },
        }
      );
    }
  }
  Fops.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Fops",
    }
  );
  return Fops;
};