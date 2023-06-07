"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserDaos extends Model {
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
        }
    }
    UserDaos.init(
        {
            userId: {
                type: DataTypes.INTEGER,
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
            modelName: "UserDao",
        }
    );

    return UserDaos;
};