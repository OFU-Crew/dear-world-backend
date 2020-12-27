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
  console.log(unicode);
  return result;
}

module.exports = {
  getRandomEmoji,
  addEmoji,
};
