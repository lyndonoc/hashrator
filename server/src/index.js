const ApiRoute = require('./api');
const app = require('./app');
const configs = require('./config');
const logger = require('./lib/logger');

const App = app(configs.API_ROUTE, ApiRoute);

App.listen(configs.PORT, () => {
  logger.info(`Listening on ${configs.PORT}`);
});

module.exports = App;
