const { validationResult } = require('express-validator');

const db = require('../models');
const generateToken = require('../../util/generateToken');

exports.register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }

  const { userName, email, password, firstName, lastName, mobile } = req.body;

  try {
    //create new user
    const user = await db.User.create({
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
    res.status(201).json({
      status: 'success',
      message: 'User successfully signed up',
      data: {
        id: user.uuid,
        email: user.email,
        userName: user.userName,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
