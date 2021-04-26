const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const emailHandler = require('../../util/emailHandler');
const { sessionValidator } = require('../../util/sessionValidator');
const {
  forgotPasswordHTML,
  passwordResetHTML,
} = require('../../util/constants');
const { errorResponse } = require('../../util/errorResponse');
const { successResponse } = require('../../util/successResponse');


/**
 * @description Reset password controller
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns a response that return a successful password reset.
 */

// Fetch user from database
const fetchUserFromDB = async (req, res, email) => {
  const user = await User.getByEmail(email);

//check if user exist
  if (!user) {
    return errorResponse(req, res, 404, 'user does not exist');
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
    successResponse(res, 200, 'mail sent successfully');
  } catch (err) {
    errorResponse(req, res, 500, 'email could not be sent');
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
    successResponse(res, 200, 'password reset successful');
  } catch (err) {
    errorResponse(req, res, 400, 'invalid reset url');
  }
};
