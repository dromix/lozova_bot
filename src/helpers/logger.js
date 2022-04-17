const { pino } = require("pino");
const pretty = require("pino-pretty");

const stream = pretty({
  colorize: true,
  ignore: "pid,hostname",
  levelFirst: true,
  translateTime: "mm/dd HH:MM:ss o",
  customPrettifiers: {
    caller: (caller) => `${caller}`,
  },
});

const pinoForLogger = pino(
  {
    serializers: {
      err: (e) => ({
        type: e.type,
        message: e.message,
        stack: e.stack,
      }),
    },
  },
  stream
);

class Logger {
  constructor() {
    this._logger = pinoForLogger;
  }

  info(message, ...args) {
    return this._logger.info(args, message);
  }

  error(err, msg) {
    return this._logger.error({ err }, msg);
  }
}

module.exports = new Logger();
