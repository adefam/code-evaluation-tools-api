const { validationResult } = require('express-validator');
const { Exercise } = require('../../../models');
const { errorResponse } = require('../../../util/errorResponse')
const { successResponse } = require('../../../util/successResponse')

/**
 * @description Create exercise controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response that return exercise id and title.
 */

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
    successResponse(res, 201, 'exercise successfully created', {
      id: exercise.uuid,
      title: exercise.title,
    })
    
  } catch (error) {
    errorResponse(req, res);
  }
};
