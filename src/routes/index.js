const express = require('express');
const router = new express.Router();

router.use('/health', (req, res) => {
  res.send('OK');
});

module.exports = router;
