const { User } = require('../../models');
const { errorResponse } = require('../../util/errorResponse')
const { successResponse } = require('../../util/successResponse')

/**
 * @description Get one users controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to return a signle user.
 */

exports.getOneUser = async (req, res) => {
  try {
    const uuid = req.params.id;

    const user = await User.findByPk(uuid);

    if (!user) {
      return errorResponse(req, res, 404, 'user not found');
    }

    successResponse(res, 200, 'user data successfully fetched', { user });

  } catch (error) {
    errorResponse(req, res)
  }
};
