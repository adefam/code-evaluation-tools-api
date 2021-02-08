const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const emailHandler = require('../../util/emailHandler');
const { sessionValidator } = require('../../util/sessionValidator');
const {
  forgotPasswordHTML,
  passwordResetHTML,
} = require('../../util/constants');

// Fetch user from database
const fetchUserFromDB = async (req, res, email) => {
  const user = await User.getByEmail(email);
  if (!user) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'user does not exist' });
  }
  return {
    uid: user.uuid,
    firstName: user.firstName,
    passwordHash: user.password,
  };
};

// Handle forgot password route
exports.forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  }

  // check that user exists
  const { email } = req.body;
  const user = await fetchUserFromDB(req, res, email);

  // sign jwt
  const expiresIn = process.env.PASSWORD_RESET_EXPIRY_TIME;
  const aud = process.env.PASSWORD_RESET_AUD;
  const iss = process.env.PASSWORD_RESET_ISSUER;
  const algorithm = process.env.PASSWORD_RESET_ALGORITHM;
  const { uid } = user;

  const token = jwt.sign(
    {
      iss,
      aud,
      email,
      uid,
    },
    user.passwordHash,
    { expiresIn, algorithm }
  );

  // send mail
  const subject = 'Password Reset';
  const text = 'Reset your password';
  const html = forgotPasswordHTML(req, user, token);

  try {
    await emailHandler(email, subject, text, html);
    res.json({
      status: 'success',
      message: 'mail sent successfully',
    });
  } catch (err) {
    res.status(500).json({
      stats: 'fail',
      message: 'email could not be sent',
    });
  }
};

// Handle update password route
exports.resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(422).json({ message: errors.array() });

  const { resetToken } = req.params;
  const { password } = req.body;

  try {
    const payload = jwt.decode(resetToken);
    const { email, uid } = payload;

    const user = await fetchUserFromDB(req, res, email);

    await sessionValidator(
      resetToken,
      user.passwordHash,
      process.env.PASSWORD_RESET_AUD
    );

    // Update User Password.
    await User.update({ password: password }, { where: { uuid: uid } });

    // send confirmation mail to user
    const subject = 'Password Reset Success';
    const text = 'Your password has been reset';
    const html = passwordResetHTML(user);

    await emailHandler(email, subject, text, html);
    res.status(200).json({
      status: 'success',
      message: 'password reset successful',
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'invalid reset url' });
  }
};
