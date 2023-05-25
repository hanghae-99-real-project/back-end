"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "UserId",
      });
      this.hasMany(models.Likes, {
        targetKey: "postId",
        foreignKey: "PostId",
      });
      this.hasMany(models.Comments, {
        targetKey: "postId",
        foreignKey: "PostId",
      });
      this.hasMany(models.ChildComments, {
        targetKey: "postId",
        foreignKey: "PostId",
      });
    }
  }
  Posts.init(
    {
      postId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      likesCount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      photoUrl: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    },
    {
      sequelize,
      modelName: "Posts",
    },
  );
  return Posts;
};
