const { successResponse } = require('../../util/successResponse');

// Retrive uploaded image
exports.getUserImage = async (req, res) => {
  const user = req.user;

  successResponse(res, 200, 'profile picture successfully fetched', {
    id: user.uuid,
    image: user.image ? Buffer.from(user.image).toString('base64') : '',
  });
};
