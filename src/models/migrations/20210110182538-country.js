'use strict';
const {Country} = require('../index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      const countries = await Country.findAll({});

      for (const country of countries) {
        const firstUnicodeStr = country.emojiUnicode
            .codePointAt(0)
            .toString(16);
        const secondUnicodeStr = country.emojiUnicode
            .codePointAt(2)
            .toString(16);

        const imageUrl = `https://twemoji.maxcdn.com/v/latest/72x72/${
          firstUnicodeStr.toLowerCase()
        }-${
          secondUnicodeStr.toLowerCase()
        }.png`;
        await country.update({
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
    const countries = await Country.findAll({});
    const t = await queryInterface.sequelize.transaction();
    try {
      for (const country of countries) {
        await country.update({
          'imageUrl': null,
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
};
