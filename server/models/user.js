'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
     allowNull:false,
      validate: {
       notEmpty: {
        args: true,
        msg: 'Firstname field cannot be empty'
      },
    },
    lastName: DataTypes.STRING,
     allowNull:false,
      validate: {
       notEmpty: {
        args: true,
        msg: 'Lastname field cannot be empty'
    },
   },
   email: DataTypes.STRING,
   allowNull:false,
   unique: true,
    validate: {
     notEmpty: {
      args: true,
      msg: 'Email field cannot be empty'
    },
  },
  password: DataTypes.STRING,
     allowNull:false,
      validate: {
       notEmpty: {
        args: true,
        msg: 'Password field cannot be empty'
      },
      len: {
        args: [10],
        msg: 'password must contain a maximum of 10 characters'
      }
    },
    isAdmin: DataTypes.BOOLEAN,
     defaultValue: false,
    role: {
      type: DataTypes.ENUM,
        values: ['user', 'admin','superadmin'],
         defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
}
