const path = require("path");
const dotenv = require("dotenv");

const NODE_ENV = process.env.NODE_ENV || "development";

const envFile = `.env.${NODE_ENV}`;

dotenv.config({ path: path.resolve(__dirname, "../..", envFile) });

function defaults(key, defaultValue) {
  if (process.env[key] === undefined) {
    return defaultValue;
  }
  return process.env[key];
}

const config = {
    ENV: defaults("ENV", "development"),
    APP_NAME: defaults("APP_NAME", ""),

    CLIENT_URL: defaults("CLIENT_URL", ""),
    SERVER_URL: defaults("SERVER_URL", ""),
    SERVER_PORT: defaults("SERVER_PORT", 3001),
    CLIENT_PORT: defaults("CLIENT_PORT", 3002),

    PG_USER: defaults("PG_USER", "postgres"),
    PG_PASSWORD: defaults("PG_PASSWORD", ""),
    PG_DATABASE: defaults("PG_DATABASE", ""),
    PG_PORT: defaults("PG_PORT", ""),
    PG_HOST: defaults("PG_HOST", ""),

    TOKEN_SECRET: defaults("TOKEN_SECRET", ""),

    MAIL_SMTP_HOST: defaults("MAIL_SMTP_HOST", ""),
    MAIL_SENDER: defaults("MAIL_SENDER", ""),
    MAIL_PORT: defaults("MAIL_PORT", ""),
    MAIL_SECURE: defaults("MAIL_SECURE", ""),
    MAIL_TLS_REJECT: defaults("MAIL_TLS_REJECT", ""),
};

module.exports = config