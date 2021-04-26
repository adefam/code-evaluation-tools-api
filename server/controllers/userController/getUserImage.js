const { successResponse } = require('../../util/successResponse');


/**
 * @description Get image controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response to the user that return image uploaded.
 */

// Retrive uploaded image
exports.getUserImage = async (req, res) => {
  const user = req.user;

  successResponse(res, 200, 'profile picture successfully fetched', {
    id: user.uuid,
    image: user.image ? Buffer.from(user.image).toString('base64') : '',
  });
};
