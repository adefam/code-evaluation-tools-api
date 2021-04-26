const { validationResult } = require('express-validator');
const { User } = require('../../models');
const { errorResponse } = require('../../util/errorResponse')
const { successResponse } = require('../../util/successResponse')

/**
 * @description Update users status controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response that return user status update.
 */

exports.adminUpdateUserStatus = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', errors: errors.array() });
    }

    const uuid = req.params.id;

    const { status } = req.body;

    // find users by id
    const user = await User.findByPk(uuid);

    // Update The User Record if user exist
    if (user) {
      await user.update({ status }, { hooks: false });
    }

    const message = status === 'deactivated'
      ? 'user successfully deactivated'
      : 'user successfully activated';

    const data = ({
      uuid: user.uuid,
      userName: user.userName,
      status: user.status,
    })

    successResponse(res, 200, message, data)

  } catch (error) {
    errorResponse(req, res)
  }
};
