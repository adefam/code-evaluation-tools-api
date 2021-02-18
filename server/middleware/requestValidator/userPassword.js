const { body } = require('express-validator');

module.exports = [
    body('oldPassword')
    .trim(' ')
    .notEmpty()
    .withMessage('Input a user password')
    .escape(),
    body('newPassword')
    .trim(' ')
    .notEmpty()
    .withMessage('Input a user password')
    .escape(),   

];
