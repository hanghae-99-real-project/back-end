"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      commentId: {
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
      PostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "Posts",
          key: "postId",
        },
        onDelete: "CASCADE",
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      commentPhotoUrl: {
        allowNull: true,
        type: Sequelize.JSON,
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
      isPrivate: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      commentLatitude: {
        allowNull: true,
        type: Sequelize.DECIMAL(17, 14)
      },
      commentLongitude: {
        allowNull: true,
        type: Sequelize.DECIMAL(17, 14)
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};