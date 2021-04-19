/**
 * @description A function that facilitates the handling of an error response
 * @param {Request} req http request object
 * @param {Response} res http response object
 * @param {Number} [status=500] http error status, defaults to 500
 * @param {String} message custom error message, defaults to errMessage
 * @returns {Response} http response with error, status and message
 */

exports.errorResponse = (req, res, status = 500, message) => {
  let errMessage;
  if (message == null) {
    switch (status) {
      case 400:
        errMessage = 'You are missing vital credentials';
        break;
      case 401:
        errMessage = `Ensure you are logged in, or signup at ${req.headers.host}/api/v1/auth/register`;
        break;
      case 403:
        errMessage = 'Invalid user access';
        break;
      case 422:
        errMessage = 'Invalid user input';
        break;
      default:
        errMessage = 'Internal server error';
        break;
    }
  } else {
    errMessage = message;
  }
  return res.status(status).send({ status: 'fail', message: errMessage });
};
