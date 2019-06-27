const compression = require('compression');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const ApiRoute = require('./api');
const configs = require('./config');
const winston = require('./lib/logger');
const { error } = require('./lib/responses');

const app = express();

app.use(cors());
app.use(compression());
app.use(
  morgan('combined', {
    stream: winston.stream,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(configs.API_ROUTE, ApiRoute);

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

module.exports = app;
