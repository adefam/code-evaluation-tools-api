const { query } = require('express-validator');

exports.pagination = [
  query('page')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('invalid query, query has to be a number')
    .escape(),
  query('size')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('invalid query, query has to be a number')
    .escape(),
];
