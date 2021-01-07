const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config/config.env' });

/**
 * @description A mailing service that sends a mail to the user
 * @param {String} mail the user's email
 * @param {String} subject the subject of the mail
 * @param {String} text body of the mail in plain text
 * @param {String} html body of the mail in html
 * @returns a mail to the user
 */

module.exports = async (mail, subject, text, html) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USERNAME,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"DSN" <noreply@dsn.com>',
    to: mail,
    subject,
    text,
    html,
  };

  return transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Mail sent: %s', info.messageId);
    transport.close();
  });
};
