import config from "../utils/config.js";
import mailer from "./nodeMailer.js";
import {
  createFromTemplate
} from "./templateLoader.js";

export async function sendConfirmationMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "confirm-email.html"
  );
  const result = mailer(email, "Verify your email", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

export async function sendAccountRegisteredMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "account-registered.html"
  );
  const result = mailer(email, "Account Registration", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

export async function sendAccountActivatedMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "account-activated.html"
  );
  const result = mailer(email, "Account is Activated", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}

export async function sendResetPasswordMail(email, name, code) {
  const content = await createFromTemplate(
    { email: encodeURIComponent(email), name, code, clientUrl: config.CLIENT_URL, serverUrl: config.SERVER_URL },
    "reset-password.html"
  );
  const result = mailer(email, "Reset Your Password", content);
  if (!result) {
    console.error("Sending email did not work");
  }
}