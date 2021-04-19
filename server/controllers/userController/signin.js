const generateToken = require('../../util/generateToken');
const { successResponse } = require('../../util/successResponse');

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
