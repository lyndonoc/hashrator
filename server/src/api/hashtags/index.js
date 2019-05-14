const express = require('express');

const controllers = require('./controller');

const router = express.Router();

router.get('/:hashtag', controllers.getHashTags);

module.exports = router;
