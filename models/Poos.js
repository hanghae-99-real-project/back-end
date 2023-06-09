"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Poos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "UserId",
      });
      this.hasMany(models.ReportPoos, {
        sourceKey: 'pooId',
        foreignKey: 'PooId',
      })
    }
  }
  Poos.init(
    {
      pooId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pooPhotoUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pooLatitude: {
        type: DataTypes.DECIMAL(17, 14),
        allowNull: false
      },
      pooLongitude: {
        type: DataTypes.DECIMAL(17, 14),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    },
    {
      sequelize,
      modelName: "Poos",
    },
  );
  return Poos;
};
