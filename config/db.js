const { Sequelize } = require('sequelize');

const color = require('../util/color');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'postgres',
  }
);

exports.sequelize = sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Database Connection has been established successfully.'.success
    );
  } catch (err) {
    console.error('Unable to connect to the database:'.error, err);
  }
})();
