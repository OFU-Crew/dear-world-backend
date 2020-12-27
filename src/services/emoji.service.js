const {Emoji, Sequelize} = require('../models');

async function getRandomEmoji() {
  const emojiModel = await Emoji.findOne(
      {
        'order': [Sequelize.literal('rand()')],
      },
  );
  const emojiValue = emojiModel.get();
  return {
    emojiId: emojiValue.id,
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
