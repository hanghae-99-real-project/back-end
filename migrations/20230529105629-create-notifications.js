'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      notificationId: {
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
        allowNull: true,
        type: Sequelize.INTEGER,
        reference: {
          model: "Posts",
          key: "postId",
        },
        onDelete: "CASCADE",
      },
      CommentId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        reference: {
          model: "Comments",
          key: "commentId",
        },
        onDelete: "CASCADE",
      },
      ChildCommentId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        reference: {
          model: "ChildComments",
          key: "childCommentId",
        },
        onDelete: "CASADE"
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Notifications');
  }
};
