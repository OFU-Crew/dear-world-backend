const express = require('express');
const router = new express.Router();
const emojiController = require('../../../controllers/emoji.controller');

router.get('/all', emojiController.getEmojis);
router.get('/random', emojiController.getRandomEmoji);

module.exports = router;
