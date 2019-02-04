const url = require('url');

const { TAG_SEARCH_API: tagSearchApi } = require('../config');

const getHashTagPage = (tag) => {
  return url.format({
    protocol: tagSearchApi.protocol,
    hostname: tagSearchApi.hostname,
    pathname: `${tagSearchApi.pathname}/${encodeURIComponent(tag)}`
  });
};

module.exports = {
  getHashTagPage,
};
