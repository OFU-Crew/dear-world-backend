const express = require('express');
const router = new express.Router();
const messageRouter = require('./message.route');
const emojiRouter = require('./emoji.route');
const countryRouter = require('./country.route');
const mapRouter = require('./maps.route');
// const limiter = require('../../../middlewares/express_rate_limit');

router.use('/messages', messageRouter);
router.use('/emojis', emojiRouter);
router.use('/countries', countryRouter);
router.use('/maps', mapRouter);

module.exports = router;
