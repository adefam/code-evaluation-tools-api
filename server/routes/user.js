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
const { multerConfig } = require('../middleware/upload');


const { signin } = require('../controllers/userControllers.js/signin');
const { register } = require('../controllers/userControllers.js/register');
const { updateUser } = require('../controllers/userControllers.js/update');
const { changePassword } = require('../controllers/userControllers.js/changePassword');
const { uploadFiles } = require('../controllers/userControllers.js/upload');

router.post('/register', [userSignupValidator, verifySignUp, register]);
router.post('/signin', [userSigninValidator, verifySignin, signin]);
router.patch('/updateUser', [
  verifyUserToken,
  userUpdateValidator,
  verifyUserUpdate,
  updateUser,
]);
router.patch('/changePassword', [verifyUserToken, userPassword, changePassword]);
router.patch('/avatar', [verifyUserToken, multerConfig, uploadFiles]);

module.exports = router;
