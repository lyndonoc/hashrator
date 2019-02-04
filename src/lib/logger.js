const {
  addColors,
  createLogger,
  format,
  transports
} = require('winston');

const config = require('../config');

const errorFormat = format((info) => {
  const splat = (info && info[Symbol.for('splat')]) || [];
  const e = splat.length && splat[splat.length - 1];
  if (e instanceof Error) {
    return {
      ...(info || {}),
      stack: e.stack,
      [Symbol.for('splat')]: splat.splice(splat.length - 1, 1, e.message),
    };
  }
  return info;
});

const logger = createLogger({
  level: config.LOG_LEVEL,
  transports: [
    new transports.Console({
      format: format.combine(
        errorFormat(),
        format.colorize(),
        format.splat(),
        format.simple(),
      ),
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

addColors({
  debug: 'white',
  error: 'red',
  info: 'green',
  warn: 'yellow',
});

module.exports = logger;
