const { body } = require('express-validator');

module.exports = [
  body('title')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('Please input title field')
    .escape(),
  body('body')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input body field')
    .escape(),
  body('hint')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input hint field')
    .escape(),
  body('testCode')
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('please input testCode field')
    .escape(),
  body('testCodeSolution')
    .trim(' ')
    .notEmpty()
    .toLowerCase()
    .withMessage('please input testCodeSolution field')
    .escape(),
];
