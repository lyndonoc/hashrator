const logger = require('./logger');

const error = (res, message, code = 500) => {
  logger.error(message);

  if (typeof message === 'object') {
    return res
      .status(code)
      .json(message);
  }

  return res
    .status(code)
    .send(message.toString());
};

const success = (res, data) => {
  return res
    .status(200)
    .json(data);
};

module.exports = {
  error,
  success,
};
