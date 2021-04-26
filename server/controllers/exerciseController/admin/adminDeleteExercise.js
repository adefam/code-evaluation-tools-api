const { Exercise } = require('../../../models');
const { errorResponse } = require('../../../util/errorResponse')
const { successResponse } = require('../../../util/successResponse')

/**
 * @description Delete exercise controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response that returns a deleted exercise.
 */

exports.adminDeleteExercise = async (req, res) => {
  try {
    const uuid = req.params.id;

    const exercise = await Exercise.findByPk(uuid);

    //check if exercise exist
    if (!exercise) {
      return errorResponse(req, res, 404, 'exercise does not exist');
    }

    const deleteExercise = await exercise.destroy();

    successResponse(res, 200, 'exercise successfully deleted');
  } catch (error) {
    errorResponse(req, res);
  }
};
