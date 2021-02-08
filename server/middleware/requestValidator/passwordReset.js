const { body, param } = require('express-validator');

module.exports.emailValidator = [
  body('email')
    .trim(' ')
    .notEmpty()
    .withMessage('please input your email')
    .isEmail()
    .withMessage('please input correct email address format')
    .normalizeEmail({ all_lowercase: true })
    .escape(),
];

module.exports.urlValidator = [
  param('resetToken').notEmpty().withMessage('Invalid URL').escape(),
];

module.exports.passwordValidator = [
  body('password')
    .trim(' ')
    .notEmpty()
    .withMessage('input a user password')
    .isLength({ min: 10 })
    .withMessage('password must be a minimum of 10 characters')
    .custom((value, { req }) => value === req.body.confirmPassword)
    .withMessage('passwords do not match')
    .escape(),
];
