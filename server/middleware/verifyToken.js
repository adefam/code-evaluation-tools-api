const jwt = require('jsonwebtoken');
const { User } = require('../models/');

exports.verifyUserToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: 'fail',
        message: 'authentication error. token required.',
      });
    }

    const token = authHeader.split(' ')[1];

    const { user } = jwt.verify(token, process.env.SECRET_MESSAGE);

    const verifyUser = await User.findByPk(user.id);

    if (!verifyUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found',
      });
    }
    req.user = verifyUser;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not authorize to access this route, token invalid or expired',
    });
  }
};
