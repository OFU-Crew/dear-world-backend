const {Emoji, Sequelize} = require('../models');

async function getRandomEmoji() {
  const emojiModel = await Emoji.findOne(
      {
        'order': [Sequelize.literal('rand()')],
        'attributes': [
          'id',
          'unicode',
          'imageUrl',
        ],
      },
  );
  return emojiModel;
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
