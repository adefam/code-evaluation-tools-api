const multer = require('multer');
const path = require('path');

//----Filter Image---
const imageFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimefile = filetypes.test(file.mimetype);

  if (!mimefile && !extname) {
    return cb('upload image of .jpeg, .jpg, .png only');
  }
  return cb(null, true);
};

//-----Image storage-----
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
  fileFilter: imageFilter,
}).single('image');

// catch possible errors
exports.multerConfig = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      //instanceof multer.MulterError
      if (err.code == 'LIMIT_FILE_SIZE') {
        err = 'file size is too large. allowed file size is 500KB';
      }
      return res.status(500).send({
        status: 'fail',
        message: err,
      });
    }
    next();
  });
};
