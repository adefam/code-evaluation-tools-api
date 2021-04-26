const { errorResponse } = require('../../util/errorResponse')
const { successResponse } = require('../../util/successResponse')
// Authorization
exports.adminAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;
//Authorize role to only admin and superadmin
    if (!role || role === 'user') {
      errorResponse(req, res, 401, "You don't have privilege to access this route");
    }

    next();
  } catch (error) {
    errorResponse(req, res)
  }
};
