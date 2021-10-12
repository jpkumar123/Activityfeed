'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'resetPasswordToken',  {
      type: Sequelize.STRING,
      allowNull: true,
    },);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removecolumn('Users','resetPasswordToken');
  }
};
