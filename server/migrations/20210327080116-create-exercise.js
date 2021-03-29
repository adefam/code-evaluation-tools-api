'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercises', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      adminId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'uuid',
          as: 'adminId'
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      hint: {
        type: Sequelize.TEXT,
      },
      testCode: {
        type: Sequelize.TEXT,
      },
      testCodeSolution: {
        type: Sequelize.STRING,
      },
      exerciseStatus: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
        defaultValue: 'beginner',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    queryInterface.sequelize.transaction(async (t) => {
      await Promise.all([
        await queryInterface.dropTable('Exercises'),
        await queryInterface.sequelize.query(
          'DROP TYPE "enum_Exercises_exerciseStatus"',
          {
            transaction: t,
          }
        ),
      ]);
    });
  },
};
