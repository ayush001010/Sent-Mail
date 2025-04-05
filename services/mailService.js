const transporter = require('../config/mailConfig');

const sendMail = async (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
