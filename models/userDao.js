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
        kakaoId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        account_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_image: {
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