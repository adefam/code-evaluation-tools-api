const { body } = require('express-validator');

module.exports = [
  body('userName')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('Please input your username')
    .isLength({ max: 30 })
    .withMessage('username is too long provide a max length of 30')
    .escape(),
  body('firstName')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('Please input your first name')
    .escape(),
  body('lastName')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('Please input your last name')
    .escape(),
  body('email')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('Please input your email')
    .isEmail()
    .withMessage('Please input correct email address format')
    .normalizeEmail({ all_lowercase: true }),
  body('mobile')
    .trim(' ')
    .notEmpty()
    .withMessage('Please input your phone number')
    .isLength({ min: 9, max: 11 })
    .withMessage('mobile must contain a minimun of 9 and maximum of 11 characters')
    .escape(),
  body('password')
    .trim(' ')
    .notEmpty()
    .withMessage('Input a user password')
    .isLength({ min: 10 })
    .withMessage('password must be a minimum of 10 characters')
    .escape(),
];
