"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany( models.Apps,
        {
          onDelete: "NO ACTION",
          onUpdate: "NO ACTION",
        },
        {
          foreignKey: {
            name: "devId",
            allowNull: false,
          },
        }
      );
      Users.hasMany( models.Purchases,
        {
          onDelete: "NO ACTION",
          onUpdate: "NO ACTION",
        },
        {
          foreignKey: {
            name: "userId",
            allowNull: false,
          },
        }
      );
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isDev: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Users",
    }
  );
  return Users;
};