const config = require("../utils/config.js");
const mailer = require("./nodeMailer.js");
const { createFromTemplate } = require("./templateLoader.js");

async function sendConfirmationMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL },
    "confirm-email.html"
  );
  console.log(content)
  const result = mailer(email, "Verify your email", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

async function sendAccountApprovedMail(email, name, password) {
  const content = await createFromTemplate(
    {
      email: encodeURIComponent(email),
      name,
      password,
      clientUrl: config.CLIENT_URL,
    },
    "account-approved.html"
  );
  const result = mailer(email, "Your Account Has Been Approved", content);
  if (!result) {
    console.error("Sending approval email did not work");
  }
}

async function sendAccountRegisteredMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "account-registered.html"
  );
  console.log(content)
  const result = mailer(email, "Account Registration", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

async function sendAccountActivatedMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "account-activated.html"
  );
  const result = mailer(email, "Account is Activated", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

async function sendResetPasswordMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "reset-password.html"
  );
  console.log(content)
  const result = mailer(email, "Reset Your Password", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

module.exports = {
  sendConfirmationMail,
  sendAccountRegisteredMail,
  sendAccountActivatedMail,
  sendResetPasswordMail,
  sendAccountApprovedMail,
};
