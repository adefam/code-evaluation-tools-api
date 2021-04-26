const { errorResponse } = require('../../util/errorResponse');
const { successResponse } = require('../../util/successResponse');


/**
 * @description Upload image controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response the user that return id and image(base64).
 */

exports.uploadFiles = async (req, res) => {
  try {
    // Request upload file
    if (req.file === undefined) {
      return errorResponse(req, res, 400, 'please select a file');
    }

    //user update image
    const user = await req.user.update({
      image: req.file.buffer,
    });

    //response status
    successResponse(res, 200, 'profile picture saved successfully', {
      id: user.uuid,
      image: Buffer.from(user.image).toString('base64'),
    });
  } catch (err) {
    errorResponse(req, res, 500, 'image upload failed');
  }
};
