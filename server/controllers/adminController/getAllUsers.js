const { validationResult } = require('express-validator');
const { User } = require('../../models');
const { pagination } = require('../../util/pagination');

/**
 * Get all users controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user including a paginated list of all users.
 */

exports.getAllUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  }

  let { offset, limit, page } = pagination(req.query);

  try {
    let data = await User.getUsers(offset, limit);
    const totalPage = Math.ceil(data.count / limit);

    if (page > totalPage) {
      offset = (totalPage - 1) * limit;
      data = await User.getUsers(offset, limit);
    }

    res.status(200).json({
      status: 'success',
      message: 'users successfully fetched',
      data: {
        totalUsers: data.count,
        users: data.rows,
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
