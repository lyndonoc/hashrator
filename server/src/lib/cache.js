const redis = require(process.env.NODE_ENV !== 'test' ? 'redis' : 'redis-mock');
const { promisify } = require('util');

const config = require('../config');

const client = redis.createClient(`redis://${config.REDIS.HOST}`);

module.exports = {
  client,
  set: promisify(client.set).bind(client),
  get: promisify(client.get).bind(client),
};
