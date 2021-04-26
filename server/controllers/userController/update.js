const { validationResult } = require('express-validator');
const { User } = require('../../models');
const { errorResponse } = require('../../util/errorResponse');
const { successResponse } = require('../../util/successResponse');


/**
 * @description Update user controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that return a updated data.
 */

// Update a user
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }

  try {
    const user = req.user;

    const { userName, firstName, lastName, mobile, email } = req.body;

    // Update The User Record if user exist
    if (user) {
      await user.update({
        firstName,
        lastName,
        mobile,
        email,
        userName,
      });
    }

    successResponse(res, 200, 'profile successfully updated', {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
    });
  } catch (error) {
    errorResponse(req, res, 500, 'error in updating profile');
  }
};
