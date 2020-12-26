const Country = require('../models').Country;

async function addCountry(code, fullName, emojiUnicode) {
  const result = Country.create({code, fullName, emojiUnicode});
  return result;
}

module.exports = {
  addCountry,
};
