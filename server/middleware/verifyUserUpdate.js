const { Op } = require('sequelize');
const { User } = require('../models');
const { errorResponse } = require('../util/errorResponse')

exports.verifyUserUpdate = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    if (Object.keys(req.body).length === 0) {
      errorResponse(req, res, 400, "fields cannot be empty");
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
      errorResponse(req, res, 400, "user credential already exists");
    }

    next();
  } catch (error) {
    errorResponse(req, res);
  }
};
