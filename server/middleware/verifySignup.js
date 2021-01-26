const { User } = require('../models');

exports.verifySignUp = async (req, res, next) => {
  try {
    //username
    const user = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (user) {
      return res.status(400).send({
        status: 'fail',
        message: 'username already exists',
      });
    }

    // Email
    const userEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userEmail) {
      return res.status(400).send({
        status: 'fail',
        message: 'email already exists',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred trying to process your request',
    });
  }
};
