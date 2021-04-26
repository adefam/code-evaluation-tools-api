const { validationResult } = require('express-validator');

const { User } = require('../../models');
const { errorResponse } = require('../../util/errorResponse');
const generateToken = require('../../util/generateToken');
const { successResponse } = require('../../util/successResponse');


/**
 * @description Register user controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that return user id, role, status and token.
 */

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }

  const { userName, email, password, firstName, lastName, mobile } = req.body;

  try {
    //create new user
    const user = await User.create({
      userName,
      email,
      password,
      firstName,
      lastName,
      mobile,
    });
    //Generate Token
    const token = generateToken(user.uuid, user.email);

    //response status
    successResponse(res, 201, 'User successfully signed up', {
      id: user.uuid,
      role: user.role,
      status: user.status,
      token,
    });
  } catch (error) {
    errorResponse(req, res);
  }
};
