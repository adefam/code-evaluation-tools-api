const jwt = require('jsonwebtoken');

/**
 * Verify the user's authenticity
 * @param {String} token The user's token.
 * @param {String} secret The secret key that was used to sign the expected token.
 * @param {String} audience The type of expected user.
 */
exports.sessionValidator = async (token, secret, audience) =>
  jwt.verify(
    token,
    secret,
    {
      algorithms: [process.env.PASSWORD_RESET_ALGORITHM],
      audience,
      issuer: process.env.PASSWORD_RESET_ISSUER,
    },
    (err, result) => {
      if (err) {
        return Promise.reject(err);
      }
      return Promise.resolve(result.uid);
    }
  );
