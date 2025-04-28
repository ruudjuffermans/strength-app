const nodemailer = require("nodeMailer");

const config = require("../utils/config.js");

let transporter = nodemailer.createTransport({
  host: config.MAIL_SMTP_HOST,
  port: config.MAIL_PORT,
  secure: config.MAIL_SECURE,
  tls: {
      rejectUnauthorized: config.MAIL_TLS_REJECT
  }
});

const sender = async function (to, subject, body) {
  try {
    const response = await transporter.sendMail({
      from: {
        name: config.APP_NAME,
        address: config.MAIL_SENDER,
      },
      to,
      subject,
      html: body,
    });
    return !!response.accepted;
  } catch (e) {
    console.error("SMTP error", e);
    return false;
  }
};

module.exports = sender;