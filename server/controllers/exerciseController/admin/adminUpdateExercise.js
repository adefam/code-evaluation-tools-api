const { validationResult } = require('express-validator');
const { Exercise } = require('../../../models');
const { errorResponse } = require('../../../util/errorResponse')
const { successResponse } = require('../../../util/successResponse')


exports.adminUpdateExercise = async (req, res) => {
  const errors = validationResult(req);

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'request body cannot be empty' });
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'fail', errors: errors.array() });
  }
  const {
    body,
    params: { id: uuid },
  } = req;

  try {
    const exercise = await Exercise.findByPk(uuid);

    if (!exercise) {
      return errorResponse(req, res, 404, 'exercise does not exist');
    }

    const updateExercise = await exercise.update(body);

    successResponse(res, 200, 'exercise  updated successfully');
  } catch (error) {
    errorResponse(req, res);
  }
};
