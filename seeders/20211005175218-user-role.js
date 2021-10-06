'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        Username : "jp",
        email:"adminonly@admingmail.com",
        password: "test123",
        "mobileno":9838234,
        role_id: 1,
        createdAt:"2021-10-05",
        "updatedAt":"18-03-09"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
