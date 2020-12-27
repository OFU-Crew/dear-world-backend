const express = require('express');
const router = new express.Router();
const messageController = require('../../../controllers/message.controller');

router.post('/', messageController.addMessage);
router.get('/', messageController.getMessages);
router.post('/:messageId/like', messageController.postLikeMessage);

module.exports = router;
