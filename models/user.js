'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    Username: DataTypes.STRING,
    email: {type:DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    },
    password: DataTypes.STRING,
    mobileno: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "posts",
    });
    User.belongsTo(models.Roles, {
      foreignKey: "role_id",
      as: "Role",
    });
  };

  return User;
};