"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserDao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    }
    UserDao.init(
        {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
        },
        {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false
        }
    );

    return UserDao;
};