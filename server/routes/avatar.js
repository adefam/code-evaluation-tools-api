const express = require('express');
const router = express.Router();

const { verifyUserToken } = require('../middleware/verifyToken');
const { multerConfig } = require('../middleware/upload');
const { verifyStatus } = require('../middleware/verifyStatus');
const { uploadFiles } = require('../controllers/userController/upload');
const { getUserImage } = require('../controllers/userController/getUserImage');

router
  .patch('/avatar', [verifyUserToken, verifyStatus, multerConfig, uploadFiles])
  .get('/avatar', [verifyUserToken, verifyStatus, getUserImage]);

module.exports = router;
