'use strict';
const {Emoji} = require('../index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      const emojis = await Emoji.findAll({}, {transaction: t});

      emojis.map(
          (item) => {
            const unicodeStr = item.unicode.codePointAt(0).toString(16);
            const imageUrl = `https://twemoji.maxcdn.com/v/latest/72x72/${unicodeStr.toLowerCase()}.png`;
            item.update({
              'imageUrl': imageUrl,
            });
          },
      );
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const emojis = await Emoji.findAll({});
    const t = await queryInterface.sequelize.transaction();
    try {
      emojis.map(
          (item) => {
            item.update({
              'imageUrl': '',
            });
          },
      );
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
