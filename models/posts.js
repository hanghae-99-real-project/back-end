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
<<<<<<< HEAD
      this.hasMany(models.Likes, {
=======
      this.hasMany(models.BookMarks, {
>>>>>>> f426f320c4844e668c4ad759864bd2f0be86ab39
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
      dogname: {
        type: DataTypes.STRING,
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
      photoUrl: {
        type: DataTypes.JSON,
        allowNull: false
      },
      lostLocation: {
        allowNull: false,
        type: DataTypes.JSON
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
