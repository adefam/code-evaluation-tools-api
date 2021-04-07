const { Exercise } = require('../../../models');

exports.adminDeleteExercise = async (req, res) => {
  try {
    const uuid = req.params.id;

    const exercise = await Exercise.findByPk(uuid);

    if (!exercise) {
      return res.status(404).json({
        status: 'fail',
        message: 'exercise does not exist',
      });
    }

    const deleteExercise = await exercise.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'exercise successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'an error occurred trying to process your request',
    });
  }
};
