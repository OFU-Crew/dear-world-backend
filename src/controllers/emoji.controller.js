const emojiService = require('../services/emoji.service');
const {Success, Failure} = require('../utils/response');

async function getRandomEmoji(req, res, next) {
  try {
    const data = await emojiService.getRandomEmoji();
    res.status(200).json(Success(data));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

module.exports = {
  getRandomEmoji,
};
