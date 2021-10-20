'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.associate = (models) =>{
    Post.belongsTo(models.User, {
        foreignKey:"user_id",
        as: "author"
    });
    Post.hasMany(models.Like, {
      foreignKey: "postid",
      as: "Like",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postid",
      as: "Comments",
    });

};
  return Post;
};