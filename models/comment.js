'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    postid: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  Comment.associate = (models) =>{
    Comment.belongsTo(models.User, {
        foreignKey:"user_id",
        as: "user"
    });
      Comment.belongsTo(models.Post, {
          foreignKey:"postid",
          as: "post"
      });
    };
  return Comment;
};