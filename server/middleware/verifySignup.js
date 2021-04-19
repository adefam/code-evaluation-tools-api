const { User } = require('../models');
const { errorResponse} = require('../util/errorResponse')

exports.verifySignUp = async (req, res, next) => {
  try {
    //username
    const user = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (user) {
      errorResponse(req, res, 400, "username already exists");
    }

    // Email
    const userEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userEmail) {
      errorResponse(req, res, 400, "email already exists");
    }

    next();
    
  } catch (error) {
    errorResponse(req, res);
  }
};
