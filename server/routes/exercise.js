const express = require('express');
const router = express.Router();

const createExercise = require('../middleware/requestValidator/createExercise');

const {
  adminAuthorization,
} = require('../middleware/authorization/adminAuthorization');

const { verifyUserToken } = require('../middleware/verifyToken');

const { verifyStatus } = require('../middleware/verifyStatus');
const {
  adminCreateExercise,
} = require('../controllers/exerciseController/admin/adminCreateExercise');

router.post('', [
  verifyUserToken,
  adminAuthorization,
  verifyStatus,
  createExercise,
  adminCreateExercise,
]);

module.exports = router;
