const express = require('express');
const router = express.Router();

const userSignupValidator = require('../middleware/requestValidator/userSignup');
const userSigninValidator = require('../middleware/requestValidator/userSignin');

const { verifySignUp } = require('../middleware/verifySignup');
const { verifySignin } = require('../middleware/verifySignin');

const { signin } = require('../controllers/userControllers.js/signin');
const { register } = require('../controllers/userControllers.js/register');

router.post('/register', [userSignupValidator, verifySignUp, register]);
router.post('/signin', [userSigninValidator, verifySignin, signin]);

module.exports = router;
