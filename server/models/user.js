const bcryptjs = require('bcryptjs');

('use strict');

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'username field cannot be empty',
          },
        },
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'First name field cannot be empty',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Lastname field cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email field cannot be empty',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password field cannot be empty',
          },
          len: {
            args: [10],
            msg: 'password must contain a minimum of 10 characters',
          },
        },
      },

      image: {
        type: DataTypes.BLOB,
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'must contain mobile',
          },
          len: {
            args: [9, 11],
            msg:
              'mobile must contain a minimun of 9 and maximum of 11 characters',
          },
        },
      },

      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin', 'superadmin'],
        defaultValue: 'user',
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'deactivated'],
        defaultValue: 'active',
      },
    },
    {
      hooks: {
        beforeSave: async (user) => {
          const salt = await bcryptjs.genSalt(10);
          user.password = await bcryptjs.hash(user.password, salt);
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Exercise, { foreignKey: 'adminId', as: 'exercises' });
  };
  User.getByEmail = function (email) {
    return this.findOne({
      where: {
        email: email,
      },
    });
  };
  User.getUsers = function (offset, limit) {
    return this.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'uuid',
        'userName',
        'firstName',
        'lastName',
        'email',
        'mobile',
        'role',
        'status',
      ],
      offset,
      limit,
    });
  };
  return User;
};
