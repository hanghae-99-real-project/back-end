'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.ChildComments, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasOne(models.BookMarks, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Poos, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Notifications, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasOne(models.ReportPoos, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      phoneNumber: {
        allowNull: true,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(1000000),
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      userPhoto: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      position: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      userLatitude: {
        allowNull: true,
        type: DataTypes.DECIMAL(17, 14)
      },
      userLongitude: {
        allowNull: true,
        type: DataTypes.DECIMAL(17, 14)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
