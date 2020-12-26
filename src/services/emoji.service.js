const Emoji = require('../models').Emoji;

async function getRandomEmoji() {
  const emojiCount = await Emoji.count();
  const emojiModel = await Emoji.findByPk(Date.now() % emojiCount);
  const emojiValue = emojiModel.get();

  return {
    unicode: emojiValue.unicode,
  };
}

async function addEmoji(unicode) {
  const result = await Emoji.create({unicode: unicode});
  return result;
}

module.exports = {
  getRandomEmoji,
  addEmoji,
};
