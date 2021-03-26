'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'status', {
      type: Sequelize.ENUM('active', 'deactivated'),
      defaultValue: 'active',
    });
  },

  down: async(queryInterface) => {
    queryInterface.sequelize.transaction(async(t) => {
      await Promise.all([
        await queryInterface.removeColumn('Users', 'status'),
        await queryInterface.sequelize.query('DROP TYPE "enum_Users_status"', { 
          transaction: t,
        }),
      ]);
    });
  },
    
};

