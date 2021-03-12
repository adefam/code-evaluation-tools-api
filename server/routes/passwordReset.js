const express = require('express');
const router = express.Router();

const { forgotPassword, resetPassword } = require('../controllers/userController/passwordReset');
const { emailValidator, passwordValidator, urlValidator } = require('../middleware/requestValidator/passwordReset');

router
  .post('/forgot_password', emailValidator, forgotPassword)
  .put('/reset_password/:resetToken/', [urlValidator, passwordValidator], resetPassword);

module.exports = router;
