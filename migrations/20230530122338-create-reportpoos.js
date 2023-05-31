'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReportPoos", {
      reportId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "Users",
          key: "userId",
        },
        onDelete: "CASCADE",
      },
      PooId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "Poos",
          key: "pooId",
        },
        onDelete: "CASCADE",
      },
      reportContent: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      reportCount: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReportPoos');
  }
};
