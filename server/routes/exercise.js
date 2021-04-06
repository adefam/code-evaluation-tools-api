const express = require('express');
const router = express.Router();

const exerciseInputValidation = require('../middleware/requestValidator/exerciseInputValidation');
const exerciseUpdate = require('../middleware/requestValidator/exerciseUpdate');
const { pagination } = require('../middleware/requestValidator/pagination');

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
const {
  getAllExercises,
} = require('../controllers/exerciseController/getAllExercises');

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
  ])
  .get('/', [verifyUserToken, verifyStatus, pagination], getAllExercises);

module.exports = router;
