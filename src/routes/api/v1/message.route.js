const express = require('express');
const router = new express.Router();
const messageController = require('../../../controllers/message.controller');

router.post('/', messageController.addMessage);
router.get('/:messageId', messageController.getMessage);
router.get('/', messageController.getMessages);
router.post('/:messageId/like', messageController.postLikeMessage);
router.get('/:messageId/share-link', messageController.getShareLink);

module.exports = router;
