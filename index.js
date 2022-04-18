const { Bot } = require("./src/app/bot");
const http = require("http");
const express = require("express");
const config = require("./src/config");
const logger = require("./src/helpers/logger");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.server.port);
const app = express();

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

///
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const serverPort = parseInt(val, 10);

  if (Number.isNaN(serverPort)) {
    // named pipe
    return val;
  }

  if (serverPort >= 0) {
    // port number
    return serverPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

app.get("/", (req, res) => {
  res.send("alive");
});

async function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);

  const bot = new Bot(config.telegramToken, config.groupId);

  bot.init();
}
