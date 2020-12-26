const express = require('express');
const router = new express.Router();
const apiV1Router = require('./api/v1');


router.use('/api/v1', apiV1Router);

router.get('/', (req, res) => {
  res.send('OK');
});

module.exports = router;
