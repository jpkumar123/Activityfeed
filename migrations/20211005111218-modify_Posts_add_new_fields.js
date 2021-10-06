'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'attachment',  {
      type: Sequelize.STRING,
      allowNull: true,
    },);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removecolumn('Posts','attachment');
  }
};
