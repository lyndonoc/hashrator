const express = require('express');
const controllers = require('./controller');

const router = express.Router();

router
  .get('/top/:hashtag', controllers.getHashTags)
  .get('/more/:hashtag', controllers.getMoreHashTags);

module.exports = router;
