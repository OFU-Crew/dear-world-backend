const express = require('express');
const router = new express.Router();
const messageController = require('../../../controllers/message.controller');

router.post('/', messageController.addMessage);

module.exports = router;
