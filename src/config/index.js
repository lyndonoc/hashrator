const dotenv = require('dotenv-safe');

dotenv.config({
  allowEmptyValues: true
});

const envVar = process.env;

const config = {
  all: {
    API_ROUTE: envVar.API_ROUTE || '/api',
    LOG_LEVEL: envVar.LOG_LEVEL || 'debug',
    NODE_ENV: envVar.NODE_ENV || 'development',
    TAG_SEARCH_API: {
      protocol: envVar.TAG_SEARCH_API_PROTOCOL,
      hostname: envVar.TAG_SEARCH_API_HOSTNAME,
      pathname: envVar.TAG_SEARCH_API_PATHNAME,
      topPayloadShape: envVar.TAG_SEARCH_TOP_PAYLOAD_SHAPE
        && envVar.TAG_SEARCH_TOP_PAYLOAD_SHAPE.split(','),
      morePayloadShape: envVar.TAG_SEARCH_MORE_PAYLOAD_SHAPE
        && envVar.TAG_SEARCH_MORE_PAYLOAD_SHAPE.split(','),
      nodeShape: envVar.TAG_SEARCH_NODE_SHAPE
        && envVar.TAG_SEARCH_NODE_SHAPE.split(','),
    },
  },
  development: {
    PORT: process.env.PORT || 8000,
  }
};

module.exports = {
  ...config.all,
  ...config[config.all.NODE_ENV]
};
