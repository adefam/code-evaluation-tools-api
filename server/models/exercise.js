'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    'Exercise',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      adminId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'title field cannot be empty' },
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'body field cannot be empty' },
        },
      },
      hint: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'hint field cannot be empty' },
        },
      },
      testCode: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: 'test_code field cannot be empty' },
        },
      },
      testCodeSolution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'test_code_solution field cannot be empty',
          },
        },
      },
      exerciseStatus: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['beginner', 'intermediate', 'advanced'],
        defaultValue: 'beginner',
      },
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  Exercise.associate = (models) => {
    Exercise.belongsTo(models.User, { as: 'user' });
  };
  return Exercise;
};
