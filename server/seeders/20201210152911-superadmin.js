'use strict';
const uuidv4 = require('uuid').v4;
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * @description commands to Add seed.
     *
     */
    const salt = await bcryptjs.genSalt(10);
    return queryInterface.bulkInsert('Users', [
      {
        uuid: uuidv4(),
        firstName: process.env.SUPERADMIN_FIRSTNAME,
        lastName: process.env.SUPERADMIN_LASTNAME,
        userName: process.env.SUPERADMIN_USERNAME,
        email: process.env.SUPERADMIN_EMAIL,
        password: await bcryptjs.hash(process.env.SUPERADMIN_PASSWORD, salt),
        mobile: process.env.SUPERADMIN_MOBILE,
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
