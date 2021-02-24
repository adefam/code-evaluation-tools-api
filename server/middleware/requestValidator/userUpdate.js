const { body } = require('express-validator');

module.exports = [
  body('userName')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('Please input your username')
    .isLength({ max: 30 })
    .withMessage('username is too long provide a max length of 30')
    .escape()
    .optional(),
  body('firstName')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input your first name')
    .escape()
    .optional(),
  body('lastName')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input your last name')
    .escape()
    .optional(),
  body('email')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input your email')
    .isEmail()
    .withMessage('please input correct email address format')
    .normalizeEmail({ all_lowercase: true })
    .optional(),
  body('mobile')
    .trim(' ')
    .notEmpty()
    .withMessage('please input your phone number')
    .isLength({ min: 9, max: 11 })
    .withMessage(
      'mobile must contain a minimun of 9 and maximum of 11 characters'
    )
    .escape()
    .optional(),
];
