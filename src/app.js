const compression = require('compression');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const winston = require('./lib/logger');
const { error } = require('./lib/responses');

module.exports = (apiRoot, routes) => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan('combined', {
    stream: winston.stream
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(apiRoot, routes);

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.status) {
      next(err);
    } else {
      console.error(err);
      error(res, err.message);
    }
  });

  return app;
};
