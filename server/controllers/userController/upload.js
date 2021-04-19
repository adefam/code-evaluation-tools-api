const { errorResponse } = require('../../util/errorResponse');
const { successResponse } = require('../../util/successResponse');

exports.uploadFiles = async (req, res) => {
  try {
    // Request upload file

    if (req.file === undefined) {
      return errorResponse(req, res, 400, 'please select a file');
    }

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
