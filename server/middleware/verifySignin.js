const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { errorResponse } = require('../util/errorResponse');

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
      errorResponse(req, res, 400, "invalid email or password");
    }

    //if user exist, compare user password with user db password
    // if password doesn't match show an error: invalid email or password
    if (!(await bcryptjs.compare(req.body.password, user.password))) {
      errorResponse(req, res, 400, "invalid email or password");
    }

    req.user = user;
    next();
  } catch (error) {
    errorResponse(req, res);
  }
};
