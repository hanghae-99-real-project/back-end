"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.ChildComments, {
        sourceKey: 'commentId',
        foreignKey: 'CommentId',
      });
      this.belongsTo(models.Posts, {
        sourceKey: 'postId',
        foreignKey: 'PostId',
      });
      this.belongsTo(models.Users, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Notifications, {
        sourceKey: 'commentId',
        foreignKey: 'CommentId',
      });
    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        type: DataTypes.DECIMAL(17, 14)
      },
      commentLongitude: {
        allowNull: true,
        type: DataTypes.DECIMAL(17, 14)
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "Comments",
    },
  );
  return Comments;
};
