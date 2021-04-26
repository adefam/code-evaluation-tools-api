const { errorResponse } = require('../util/errorResponse');

exports.verifyStatus = (req, res, next) => {
  const { status } = req.user;
//check users status
  if (status !== 'active') {
    errorResponse(req, res, 401, "user deactivated");
  }

  next();
  
};
