const { Op } = require('sequelize');
const { User } = require('../models');

exports.verifyUserUpdate = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        status: 'fail',
        message: 'fields cannot be empty',
      });
    }

    const { userName, email } = req.body;

    //check username and email already exists
    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          { userName: userName || req.user.userName },
          { email: email || req.user.email },
        ],
      },
    });

    if (userExists && uuid != userExists.uuid) {
      return res.status(400).send({
        status: 'fail',
        message: 'User credential already exists',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'an error occurred trying to process your request',
    });
  }
};
