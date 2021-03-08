exports.verifyStatus = (req, res, next) => {
  const { status } = req.user;

  if (status !== 'active') {
    return res.status(401).json({
      status: 'fail',
      message: 'user deactivated',
    });
  }

  next();
};
