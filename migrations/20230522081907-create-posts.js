"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
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
      dogname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lostPhotoUrl: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      lostLatitude: {
        allowNull: true,
        type: Sequelize.DECIMAL(17, 14)
      },
      lostLongitude: {
        allowNull: true,
        type: Sequelize.DECIMAL(17, 14)
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
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
      },
      views: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};