const jwt = require('jsonwebtoken');
const { User } = require('../models/');
const { errorResponse } = require('../util/errorResponse');

exports.verifyUserToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      errorResponse(req, res, 401, "authentication error. token required.");
    }

    const token = authHeader.split(' ')[1];

    const { user } = jwt.verify(token, process.env.SECRET_MESSAGE);

    const verifyUser = await User.findByPk(user.id);

    if (!verifyUser) {
      errorResponse(req, res, 404, "user not found");
    }
    req.user = verifyUser;

    next();
  } catch (error) {
    errorResponse(req, res, 401, "Not authorize to access this route, token invalid or expired");
  }
};
