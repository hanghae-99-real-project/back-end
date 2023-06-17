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
      nickname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      losttime: {
        type: Sequelize.STRING,
        allowNull: true
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
      views: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      // setDateTime: {
      //   allowNull: true,
      //   type: Sequelize.DATE
      // },
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
    await queryInterface.dropTable('Posts');
  }
};