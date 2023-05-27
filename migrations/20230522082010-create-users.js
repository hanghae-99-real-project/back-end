'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userPhoto: {
        allowNull: false,
        type: Sequelize.JSON
      },
      position: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      userLatitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(17, 14)
      },
      userLongitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(17, 14)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};