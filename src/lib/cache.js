const redis = require('redis');
const { promisify } = require('util');

const config = require('../config');

const client = redis.createClient(`redis://${config.REDIS.HOST}`);

module.exports = {
  set: client.hset.bind(client),
  get: promisify(client.hget.bind(client)),
};
