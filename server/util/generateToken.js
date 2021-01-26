const jwt = require('jsonwebtoken');

const jwtToken = (user_id, email) => {
  const payload = {
    user: {
      id: user_id,
      email: email,
    },
  };
  return jwt.sign(payload, process.env.RANDOM_SECRET_TOKEN, {
    expiresIn: process.env.EXPIRY_TIME,
  });
};

module.exports = jwtToken;
