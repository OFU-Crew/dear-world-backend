const router = require('express').Router();

router.use('/health', (req, res) => {
  res.send('OK');
});

module.exports = router;
