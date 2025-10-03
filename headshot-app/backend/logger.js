const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server.log');

// Create or clear log file on startup
fs.writeFileSync(logFile, `=== Server started at ${new Date().toISOString()} ===\n`);

function log(message, isError = false) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  // Write to file
  fs.appendFileSync(logFile, logMessage);

  // Also output to console
  if (isError) {
    console.error(message);
  } else {
    console.log(message);
  }
}

module.exports = { log };
