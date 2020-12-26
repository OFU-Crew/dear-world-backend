const express = require('express');
const router = new express.Router();
const apiV1Router = require('./api/v1');

router.use('/health', (req, res) => {
  res.send('OK');
});

router.use('/api/v1', apiV1Router);

module.exports = router;
