const app = require('./app');
const configs = require('./config');
const logger = require('./lib/logger');

logger.info(JSON.stringify(configs, null, 2));

app.listen(configs.PORT, () => {
  logger.info(`Listening on ${configs.PORT}`);
});
