'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Poos', {
      pooId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pooPhotoUrl: {
        allowNull: false,
        type: Sequelize.JSON
      },
      pooLatitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(17, 14)
      },
      pooLongitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(17, 14)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Poos');
  }
};