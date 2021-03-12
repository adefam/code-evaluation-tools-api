exports.uploadFiles = async (req, res) => {
  try {
    // Request upload file

    if (req.file === undefined) {
      return res.status(400).json({
        status: 'fail',
        message: 'please select a file.',
      });
    }

    const user = await req.user.update({
      image: req.file.buffer,
    });

    //response status
    res.status(200).send({
      status: 'success',
      message: 'profile picture saved successfully ',
      data: {
        id: user.uuid,
        image: Buffer.from(user.image).toString('base64'),
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'image upload failed' });
  }
};
