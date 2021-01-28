const emojiService = require('../services/emoji.service');
const {Success, Failure} = require('../utils/response');
const {redisDefault, getAsyncReadonly} = require('../redis');

async function getEmojis(req, res, next) {
  const emojisKey = 'emojis';

  try {
    let reply = null;
    if (redisDefault.status !== 'end') {
      reply = await getAsyncReadonly(emojisKey);
    }

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const data = await emojiService.getEmojis();

    if (redisDefault.status !== 'end') {
      redisDefault.set(emojisKey, JSON.stringify(data));
      redisDefault.expire(
          emojisKey,
          31 * 24 * 60 * 60,
      );
    }

    res.status(200).json(Success(data));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

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
  getEmojis,
};
