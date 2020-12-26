const emojiService = require('../services/emoji.service');
const Response = require('../utils/response');

async function getRandomEmoji(req, res, next) {
  try {
    const data = await emojiService.getRandomEmoji();
    res.status(200).json(Response(1, 'SUCCESS_GET_RANDOM_EMOJI', data));
  } catch (err) {
    res.status(200).json(Response(-1, 'EXCEPTION_RANDOM_EMOJI'));
  }
}

module.exports = {
  getRandomEmoji,
};
