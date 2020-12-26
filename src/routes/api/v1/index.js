const express = require('express');
const router = new express.Router();
const messageRouter = require('./message.route');

router.use('/messages', messageRouter);

module.exports = router;
