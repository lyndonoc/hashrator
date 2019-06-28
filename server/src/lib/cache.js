const redis = require(process.env.NODE_ENV !== 'test' ? 'redis' : 'redis-mock');
const { promisify } = require('util');

const config = require('../config');
const logger = require('./logger');

class CacheClient {
  constructor() {
    this.client = redis.createClient(`redis://${config.REDIS.HOST}`);
    this.disabled = false;

    this.client.on('error', this.handleError.bind(this));

    this.set = promisify(this.client.set).bind(this.client);
    this.get = promisify(this.client.get).bind(this.client);
  }

  handleError(error) {
    logger.error(
      typeof error === 'object' ? JSON.stringify(error, null, 2) : error,
    );

    this.client.quit();
    this.disabled = true;
  }

  getData(key) {
    return this.disabled ? Promise.resolve(false) : this.get(key);
  }

  setData(key, data = {}, expiresIn = config.REDIS.EXP) {
    return this.disabled
      ? Promise.resolve()
      : this.set(key, data, 'EX', expiresIn);
  }
}

module.exports = new CacheClient();
