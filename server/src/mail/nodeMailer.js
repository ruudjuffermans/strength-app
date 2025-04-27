import nodemailer from "nodemailer";
import config from "../utils/config.js";


let transporter = nodemailer.createTransport({
  host: "localhost",
  port: 25,
  secure: false,
  tls: {
      rejectUnauthorized: false // allow self-signed certs
  }
});

const smtpSender = async function (to, subject, body) {
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

export default smtpSender;