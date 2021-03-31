const { validationResult } = require('express-validator');
const { Exercise } = require('../../../models');

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
      return res.status(404).json({
        status: 'fail',
        message: 'exercise does not exist',
      });
    }

    const updateExercise = await exercise.update(body);

    return res.status(200).json({
      status: 'success',
      message: 'exercise updated successfully',
      data: updateExercise,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'an error occurred trying to process your request',
    });
  }
};
