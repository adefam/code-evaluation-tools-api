const { body } = require('express-validator');

module.exports = [
  body('title')
    .if(body('title').exists())
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('title field cannot be empty')
    .escape(),
  body('body')
    .if(body('body').exists())
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('body field cannot be empty')
    .escape(),
  body('hint')
    .if(body('hint').exists())
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('hint field cannot be empty')
    .escape(),
  body('testCode')
    .if(body('testCode').exists())
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('testCode field cannot be empty')
    .escape(),
  body('exerciseStatus')
    .if(body('exerciseStatus').exists())
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('exerciseStatus field cannot be empty')
    .escape(),
  body('testCodeSolution')
    .if(body('testCodeSolution').exists())
    .trim(' ')
    .toLowerCase()
    .notEmpty()
    .withMessage('testCodeSolution field cannot be empty')
    .escape(),
];
