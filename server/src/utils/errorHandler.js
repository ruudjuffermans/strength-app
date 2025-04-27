const fs = require("fs");
const path = require("path");
const { getErrorMessage } = require("./errorMessages.js");

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, "error.log");

const logErrorToFile = (err, req) => {
  const { errorCode, errorMessage, isUnknown } = getErrorMessage(err);

  // ✅ Only log errors that are NOT in the library
  if (!isUnknown) return;
  console.error("🔥 API Error Logged!");


  const timestamp = new Date().toISOString();

  const requestInfo = req
    ? `\nRequest: ${req.method} ${req.originalUrl}\nIP: ${req.ip}`
    : "";

  const logEntry = `
🔥 [UNKNOWN ERROR] - ${timestamp}
Code: ${errorCode}
Message: ${errorMessage}
Stack Trace: ${err.stack || "No stack trace available."}
${requestInfo}
-----------------------------------------------------\n`;

  fs.appendFileSync(logFilePath, logEntry, "utf8");
};

const errorHandler = (err, req, res, next) => {
  console.log("---------- ERROR HANDLER ---------")
  console.log(err)
  console.log("---------- ERROR HANDLER ---------")

  logErrorToFile(err, req);

  const { errorCode, errorMessage } = getErrorMessage(err);

  res.status(errorCode === 500 ? 500 : 400).json({ error: errorMessage });
};

module.exports = { errorHandler };
