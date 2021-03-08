const { validationResult } = require('express-validator');
const { User } = require('../../models');

exports.adminUpdateUserStatus = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ status: 'fail', errors: errors.array() });
    }

    const uuid = req.params.id;

    const { status } = req.body;

    const user = await User.findByPk(uuid);

    // Update The User Record if user exist
    if (user) {
      await user.update({ status }, { hooks: false });
    }

    return res.status(200).json({
      status: 'success',
      message:
        status === 'deactivated'
          ? 'user successfully deactivated'
          : 'user successfully activated',
      data: {
        uuid: user.uuid,
        userName: user.userName,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(500).send({
      status: 'fail',
      message: 'error in updating user status',
    });
  }
};
