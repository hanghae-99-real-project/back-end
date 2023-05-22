"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChildComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.belongsTo(models.Posts, {
        sourceKey: 'postId',
        foreignKey: 'PostId',
      });
      this.belongsTo(models.Comments, {
        sourceKey: 'commentId',
        foreignKey: 'CommentId',
      });

    }
  }
  ChildComments.init(
    {
      childCommentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "CASCADE",
      },
      PostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "postId",
        },
        onDelete: "CASCADE",
      },
      CommentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: "Comments",
          key: "commentId",
        },
        onDelete: "CASCADE",
      },
      childComment: {
        allowNull: false,
        type: Sequelize.STRING,
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
    },
    {
      sequelize,
      modelName: "ChildComments",
    },
  );
  return ChildComments;
};
