const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.verifySignin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //if no user exist show an error: invaild email or password

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'invalid email or password',
      });
    }
    //if user exist, compare user password with user db password
    // if password doesn't match show an error: invalid email or password
    if (!(await bcryptjs.compare(req.body.password, user.password))) {
      return res.status(400).json({
        status: 'fail',
        message: 'invalid email or password',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'An error occurred trying to process your request',
    });
  }
};
