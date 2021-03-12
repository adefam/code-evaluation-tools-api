// Retrive uploaded image
exports.getUserImage = async (req, res) => {
  const user = req.user;

  res.status(200).send({
    status: 'success',
    message: 'profile picture successfully fetched',
    data: {
      id: user.uuid,
      image: user.image ? Buffer.from(user.image).toString('base64') : '',
    },
  });
};
