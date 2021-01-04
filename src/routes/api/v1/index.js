const express = require('express');
const router = new express.Router();
const messageRouter = require('./message.route');
const emojiRouter = require('./emoji.route');
const countryRouter = require('./country.route');
const limiter = require('../../../middlewares/express_rate_limit');

router.use('/messages', limiter('messages'), messageRouter);
router.use('/emojis', limiter('emojis'), emojiRouter);
router.use('/countries', limiter('countries'), countryRouter);

module.exports = router;
