'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        Username : "prasanth",
        email:"adminonly@admingmail.com",
        password: "$2b$10$nfdnTVHcIavz4eIGDDK0v.MWfmqrxQfSezH90O.cPc.S5TSydtfLm",
        "mobileno":92112470,
        role_id: 1,
        createdAt:"2021-01-01",
        "updatedAt":"18-02-09"
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

