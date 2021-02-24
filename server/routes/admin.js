const express = require('express');
const router = express.Router();

const userStatus = require('../middleware/requestValidator/userStatus');
const {
  adminUpdateUserStatus,
} = require('../controllers/adminController/adminUpdateUserStatus');
const {
  adminAuthorization,
} = require('../middleware/authorization/adminAuthorization');
const { verifyUserToken } = require('../middleware/verifyToken');

router.patch('/users/:id', [
  verifyUserToken,
  adminAuthorization,
  userStatus,
  adminUpdateUserStatus,
]);

module.exports = router;
