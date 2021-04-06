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
const { getAllUsers } = require('../controllers/adminController/getAllUsers');

const { pagination } = require('../middleware/requestValidator/pagination');

const { verifyStatus } = require('../middleware/verifyStatus');
const { getOneUser } = require('../controllers/adminController/getOneUser');

router
  .patch('/users/:id', [
    verifyUserToken,
    adminAuthorization,
    userStatus,
    adminUpdateUserStatus,
  ])
  .get(
    '/users',
    [verifyUserToken, adminAuthorization, verifyStatus, pagination],
    getAllUsers
  )

  .get('/users/:id', [
    verifyUserToken,
    adminAuthorization,
    verifyStatus,
    getOneUser,
  ]);

module.exports = router;
