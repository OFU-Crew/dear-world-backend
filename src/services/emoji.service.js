const {Emoji} = require('../models');
const {redisDefault, getAsyncReadonly} = require('../redis');
const RANDOM_EMOJIS_CACHE_KEY = 'emojis';

async function getRandomEmoji() {
  let emojis = null;
  let cacheData = null;

  if (redisDefault.status !== 'end') {
    cacheData = await getAsyncReadonly(RANDOM_EMOJIS_CACHE_KEY);
  }

  if (cacheData !== null) {
    emojis = JSON.parse(cacheData);
  } else {
    const emojiModels = await Emoji.findAll(
        {
          'attributes': [
            'id',
            'unicode',
            'imageUrl',
          ],
        },
    );
    emojis = emojiModels.map((model) => {
      return model.get();
    });
  }
  if (!emojis || emojis.length <= 0) {
    throw Error(`Can't find emojis`);
  }
  // Save cacheData
  if (!cacheData) {
    if (redisDefault.status !== 'end') {
      redisDefault.set(RANDOM_EMOJIS_CACHE_KEY, JSON.stringify(emojis));
      redisDefault.expire(RANDOM_EMOJIS_CACHE_KEY, 60 * 60); // 1 hour
    }
  }
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const randomEmoji = emojis[randomIndex];
  return randomEmoji;
}

async function addEmoji(unicode) {
  const lowerCaseUnicode = unicode.toLowerCase();
  const emojiFromUnicode = String.fromCodePoint(parseInt(lowerCaseUnicode, 16));
  const imageUrl = `https://twemoji.maxcdn.com/v/latest/72x72/${unicode}.png`;
  const result = await Emoji.create(
      {
        unicode: emojiFromUnicode,
        imageUrl: imageUrl,
      },
  );
  return result;
}

async function getEmojis() {
  const emojis = await Emoji.findAll({});
  return emojis;
}

module.exports = {
  getRandomEmoji,
  addEmoji,
  getEmojis,
};
