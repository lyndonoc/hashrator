const dotenv = require('dotenv-safe');
const path = require('path');

dotenv.config({
  allowEmptyValues: true,
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test'
      ? '../../.env'
      : `../../.env.${process.env.NODE_ENV}`,
  ),
});

const config = {
  all: {
    API_ROUTE: process.env.API_ROUTE || '/api',
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 4000,
    REDIS: {
      EXP: 3600,
      HOST: process.env.REDIS_HOST || 'localhost',
    },
    TAG_SEARCH_API: {
      hostname: process.env.TAG_SEARCH_API_HOSTNAME || 'www.instagram.com',
      nodeShape:
        process.env.TAG_SEARCH_NODE_SHAPE &&
        process.env.TAG_SEARCH_NODE_SHAPE.split(','),
      morePayloadShape:
        process.env.TAG_SEARCH_MORE_PAYLOAD_SHAPE &&
        process.env.TAG_SEARCH_MORE_PAYLOAD_SHAPE.split(','),
      pathname: process.env.TAG_SEARCH_API_PATHNAME || '/explore/tags',
      protocol: process.env.TAG_SEARCH_API_PROTOCOL || 'https',
      topPayloadShape:
        process.env.TAG_SEARCH_TOP_PAYLOAD_SHAPE &&
        process.env.TAG_SEARCH_TOP_PAYLOAD_SHAPE.split(','),
    },
    TAG_TYPES: {
      SIZE: 'SIZE',
      MORE: 'MORE',
      TOP: 'TOP',
    },
  },
  development: {},
  production: {},
  test: {
    MOCKED_PARSED_DATA: process.env.MOCKED_PARSED_DATA,
    MOCKED_RESPONSE: process.env.MOCKED_RESPONSE,
  },
};

module.exports = {
  ...config.all,
  ...config[config.all.NODE_ENV],
};
