const { validationResult } = require('express-validator');
const { Exercise } = require('../../models');
const { pagination } = require('../../util/pagination');

/**
 * @description Get all exercises controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user including a paginated list of all exercises.
 */

exports.getAllExercises = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  }

  let { offset, limit, page } = pagination(req.query);

  try {
    let data = await Exercise.getExercises(offset, limit);
    const totalPage = Math.ceil(data.count / limit);

    if (page > totalPage) {
      offset = (totalPage - 1) * limit;
      data = await Exercise.getExercises(offset, limit);
    }

    //response status
    res.status(200).json({
      status: 'success',
      message: 'exercises fetched successfully',
      data: {
        totalExercises: data.count,
        exercises: data.rows,
        totalPage: totalPage,
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'internal server error',
    });
  }
};
