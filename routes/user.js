const express = require('express');
const router = express.Router();

const userValidator = require('../server/middleware/requestValidator/userSignup');
const { register } = require('../server/controllers/user');
const { verifySignUp } = require('../server/middleware/verifySignup');

router.post('/register', [userValidator, verifySignUp, register]);

module.exports = router;
