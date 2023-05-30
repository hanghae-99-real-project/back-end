"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ReportPoos extends Model {
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
            this.belongsTo(models.Poos, {
                targetKey: "pooId",
                foreignKey: "PooId",
            });
        }
    }
    ReportPoos.init(
        {
            reportId: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            PooId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            reportContent: {
                type: DataTypes.STRING,
                allowNull: false
            },
            reportCount: {
                type: DataTypes.INTEGER,
                allowNull: true
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
            modelName: "ReportPoos",
        },
    );
    return ReportPoos;
};
