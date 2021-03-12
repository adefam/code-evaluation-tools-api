// Authorization
exports.adminAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (!role || role === 'user') {
      return res.status(401).json({
        status: 'fail',
        message: "You don't have privilege to access this route",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'An error occurred trying to process your request',
    });
  }
};
