module.exports.forgotPasswordHTML = (req, user, token) => {
  return `<div style='display: flex; flex-direction: column; align-items: center'>
    <div>
    <p>Dear ${user.firstName},</p>
    <p>We received a request to reset your password.</p>
    <p>Follow this link to reset your password ➡ <a href="${req.protocol}://${req.get('host')}/api/v1/auth/reset_password/${token}">Reset password Link</a></p>
    <p>If you didn’t ask to reset your password, you can ignore this email.</p>
    <p>Thanks <br/> DSN Team</p>
    </div>
    </div>`;
};

module.exports.passwordResetHTML = (user) => {
  return `<p>Dear ${user.firstName},</p>
  <p>You have successfully changed your password. </p>
  <p>Thanks for using our service. <br/> DSN &copy; 2021</p>`;
};
