const dotenv = require('dotenv-safe');

dotenv.config({
  allowEmptyValues: true,
});

const envVar = process.env;

const config = {
  all: {
    API_ROUTE: envVar.API_ROUTE || '/api',
    REDIS: {
      EXP: 3600,
      HOST: envVar.REDIS_HOST,
    },
    TAG_TYPES: {
      SIZE: 'SIZE',
      MORE: 'MORE',
      TOP: 'TOP',
    },
    LOG_LEVEL: envVar.LOG_LEVEL || 'debug',
    NODE_ENV: envVar.NODE_ENV || 'development',
    TAG_SEARCH_API: {
      protocol: envVar.TAG_SEARCH_API_PROTOCOL || 'https',
      hostname: envVar.TAG_SEARCH_API_HOSTNAME || 'www.instagram.com',
      pathname: envVar.TAG_SEARCH_API_PATHNAME || '/explore/tags',
      topPayloadShape:
        envVar.TAG_SEARCH_TOP_PAYLOAD_SHAPE &&
        envVar.TAG_SEARCH_TOP_PAYLOAD_SHAPE.split(','),
      morePayloadShape:
        envVar.TAG_SEARCH_MORE_PAYLOAD_SHAPE &&
        envVar.TAG_SEARCH_MORE_PAYLOAD_SHAPE.split(','),
      nodeShape:
        envVar.TAG_SEARCH_NODE_SHAPE && envVar.TAG_SEARCH_NODE_SHAPE.split(','),
    },
  },
  development: {
    PORT: process.env.PORT || 8000,
  },
};

module.exports = {
  ...config.all,
  ...config[config.all.NODE_ENV],
};