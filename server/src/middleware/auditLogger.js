const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/audit.log");

function auditLogger(req, res, next) {
  const user = req.user || { id: "anonymous", role: "unknown" };

  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.originalUrl,
    user: {
      id: user.id,
      role: user.role
    },
    ip: req.ip,
  };

  const logLine = JSON.stringify(logEntry) + "\n";

  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error("❌ Failed to write audit log:", err);
    }
  });

  next();
}

module.exports = { auditLogger };
