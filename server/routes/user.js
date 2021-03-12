const express = require('express');
const router = express.Router();

const userSignupValidator = require('../middleware/requestValidator/userSignup');
const userSigninValidator = require('../middleware/requestValidator/userSignin');
const userUpdateValidator = require('../middleware/requestValidator/userUpdate');
const userPassword = require('../middleware/requestValidator/userPassword');

const { verifyUserToken } = require('../middleware/verifyToken');
const { verifySignUp } = require('../middleware/verifySignup');
const { verifySignin } = require('../middleware/verifySignin');
const { verifyUserUpdate } = require('../middleware/verifyUserUpdate');
const { verifyStatus } = require('../middleware/verifyStatus');

const { signin } = require('../controllers/userController/signin');
const { register } = require('../controllers/userController/register');
const { updateUser } = require('../controllers/userController/update');
const {
  changePassword,
} = require('../controllers/userController/changePassword');

router.post('/register', [userSignupValidator, verifySignUp, register]);
router.post('/signin', [
  userSigninValidator,
  verifySignin,
  verifyStatus,
  signin,
]);
router.patch('/updateUser', [
  verifyUserToken,
  verifyStatus,
  userUpdateValidator,
  verifyUserUpdate,
  updateUser,
]);
router.patch('/changePassword', [
  verifyUserToken,
  verifyStatus,
  userPassword,
  changePassword,
]);

module.exports = router;
