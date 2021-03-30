const { validationResult } = require('express-validator');
const { Exercise } = require('../../../models');

exports.adminCreateExercise = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }
  const {
    title,
    body,
    hint,
    testCode,
    testCodeSolution,
    exerciseStatus,
  } = req.body;

  try {
    const { uuid } = req.user;

    //create exercise
    const exercise = await Exercise.create({
      adminId: uuid,
      title,
      body,
      hint,
      testCode,
      testCodeSolution,
      exerciseStatus,
    });

    //response status
    res.status(201).json({
      status: 'success',
      message: 'exercise successfully created',
      data: {
        id: exercise.uuid,
        title: exercise.title,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'internal Server Error' });
  }
};
