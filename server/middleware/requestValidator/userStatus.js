const { body } = require('express-validator');

module.exports = [
  body('status')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input your User Status')
    .escape(),
];
