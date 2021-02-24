const { validationResult } = require('express-validator');
const { User } = require('../../models');

// Update a user
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }

  try {
    const user = req.user;

    const { userName, firstName, lastName, mobile, email } = req.body;

    // Update The User Record if user exist
    if (user) {
      await user.update({
        firstName,
        lastName,
        mobile,
        email,
        userName,
      });
    }

    res.status(200).send({
      status: 'success',
      message: 'profile successfully updated',
      data: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email,
      },
    });
    
  } catch (error) {
    res.status(500).send({
      status: 'fail',
      message: 'error in updating profile: ',
    });
  }
};
