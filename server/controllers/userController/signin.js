const generateToken = require('../../util/generateToken');

exports.signin = (req, res) => {
  const { uuid, email, role, status } = req.user;
  const token = generateToken(uuid, email);

  return res.status(200).json({
    status: 'success',
    message: 'User successfully signed in',
    data: {
      id: uuid,
      role,
      status,
      token,
    },
  });
};
