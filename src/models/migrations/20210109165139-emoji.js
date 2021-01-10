'use strict';
const {Emoji} = require('../index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      const emojis = await Emoji.findAll({}, {transaction: t});

      for (const emoji of emojis) {
        const unicodeStr = emoji.unicode.codePointAt(0).toString(16);
        const imageUrl = `https://twemoji.maxcdn.com/v/latest/72x72/${unicodeStr.toLowerCase()}.png`;
        await emoji.update({
          'imageUrl': imageUrl,
        }, {
          transaction: t,
        });
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const emojis = await Emoji.findAll({});
    const t = await queryInterface.sequelize.transaction();
    try {
      for (const emoji of emojis) {
        emoji.update({
          'imageUrl': '',
        }, {
          transaction: t,
        });
      }

      t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};
