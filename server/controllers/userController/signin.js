const generateToken = require('../../util/generateToken');
const { successResponse } = require('../../util/successResponse');


/**
 * @description Signin controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that return user id, role, status and token.
 */

//signin users
exports.signin = (req, res) => {
  const { uuid, email, role, status } = req.user;
  const token = generateToken(uuid, email);

  successResponse(res, 200, 'User successfully signed in', {
    id: uuid,
    role,
    status,
    token,
  });
};
