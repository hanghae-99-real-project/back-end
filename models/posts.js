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
      this.hasMany(models.BookMarks, {
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
      this.hasMany(models.Notifications, {
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
      lostPhotoUrl: {
        type: DataTypes.JSON,
        allowNull: true
      },
      lostLatitude: {
        allowNull: false,
        type: DataTypes.DECIMAL(17, 14)
      },
      lostLongitude: {
        allowNull: false,
        type: DataTypes.DECIMAL(17, 14)
      },
      address: {
        type: DataTypes.STRING,
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
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "Posts",
    },
  );
  return Posts;
};
