'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define(
    'Score',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      exerciseId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        set(value) {
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          this.setDataValue('correct', value);
        },
      },
    },
    {
      sequelize,
      modelName: 'Score',
    }
  );
  Score.associate = (models) => {
    Score.belongsTo(models.Exercise, {
      foreignKey: 'exerciseId',
      as: 'exercise',
    });
    Score.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Score;
};
