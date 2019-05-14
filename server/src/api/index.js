const express = require('express');

const HashTagRoutes = require('./hashtags');

const router = express.Router();

router.use('/hashtags', HashTagRoutes);

module.exports = router;
