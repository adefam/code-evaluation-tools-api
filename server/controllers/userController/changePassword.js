const { User } = require('../../models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { errorResponse } = require('../../util/errorResponse');
const { successResponse } = require('../../util/successResponse');

/**
 * @description Change password controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response that return a successful password change.
 */

exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }
  try {
    //get user
    const user = req.user;

    // check if current password is correct
    if (!(await bcryptjs.compare(req.body.oldPassword, user.password))) {
      return errorResponse(req, res, 400, 'password incorrect');
    }

    //if password is correct, allow change password
    user.password = req.body.newPassword;
    await user.save();
    successResponse(res, 200, 'password changed successfully');
  } catch (error) {
    errorResponse(req, res);
  }
};
