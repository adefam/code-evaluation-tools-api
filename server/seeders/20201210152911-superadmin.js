'use strict';
const uuidv4 = require('uuid').v4;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * @description commands to Add seed.
     *
     */
    return queryInterface.bulkInsert('Users', [
      {
        uuid: uuidv4(),
        firstName: process.env.SUPERADMIN_FIRSTNAME,
        lastName: process.env.SUPERADMIN_LASTNAME,
        email: process.env.SUPERADMIN_EMAIL,
        password: process.env.SUPERADMIN_PASSWORD,
        isAdmin: process.env.SUPERADMIN_ISADMIN,
        role: process.env.SUPERADMIN_ROLE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     *@description commands to revert seed.
     *
     */
    return queryInterface.bulkDelete('Users', {
      firstName: process.env.SUPERADMIN_FIRSTNAME,
      isAdmin: process.env.SUPERADMIN_ISADMIN,
      role: process.env.SUPERADMIN_ROLE,
    });
  },
};
