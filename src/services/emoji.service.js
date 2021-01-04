const {Emoji, Sequelize} = require('../models');

async function getRandomEmoji() {
  const emojiModel = await Emoji.findOne(
      {
        'order': [Sequelize.literal('rand()')],
        'attributes': [
          'id',
          'unicode',
        ],
      },
  );
  return emojiModel;
}

async function addEmoji(unicode) {
  const result = await Emoji.create({unicode: unicode});
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
