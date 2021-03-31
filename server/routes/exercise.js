const express = require('express');
const router = express.Router();

const exerciseInputValidation = require('../middleware/requestValidator/exerciseInputValidation');
const exerciseUpdate = require('../middleware/requestValidator/exerciseUpdate');

const {
  adminAuthorization,
} = require('../middleware/authorization/adminAuthorization');

const { verifyUserToken } = require('../middleware/verifyToken');

const { verifyStatus } = require('../middleware/verifyStatus');
const {
  adminCreateExercise,
} = require('../controllers/exerciseController/admin/adminCreateExercise');
const {
  adminUpdateExercise,
} = require('../controllers/exerciseController/admin/adminUpdateExercise');

router
  .post('', [
    verifyUserToken,
    adminAuthorization,
    verifyStatus,
    exerciseInputValidation,
    adminCreateExercise,
  ])
  .patch('/:id', [
    verifyUserToken,
    adminAuthorization,
    verifyStatus,
    exerciseUpdate,
    adminUpdateExercise,
  ]);

module.exports = router;
