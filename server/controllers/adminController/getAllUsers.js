const { validationResult } = require('express-validator');
const { User } = require('../../models');
const { pagination } = require('../../util/pagination');
const { errorResponse } = require('../../util/errorResponse')
const { successResponse } = require('../../util/successResponse')

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
    successResponse(res, 200, 'users successsfully fetched', {
      totalUsers: data.count,
      users: data.rows,
      totalPage: totalPage,
      currentPage: page,
    });
  } catch (error) {
    errorResponse(req, res)
  }
};
