'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(1000000)
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      userPhoto: {
        allowNull: true,
        type: Sequelize.JSON
      },
      position: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      userLatitude: {
        allowNull: true,
        type: Sequelize.DECIMAL(17, 14)
      },
      userLongitude: {
        allowNull: true,
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