const ApiRoute = require('./api');
const app = require('./app');
const logger = require('./lib/logger');
const {
  API_ROUTE: apiRoute,
  PORT: appPort
} = require('./config');

const App = app(apiRoute, ApiRoute);

App.listen(appPort, () => {
  logger.info(`Listening on ${appPort}`);
});

module.exports = App;
