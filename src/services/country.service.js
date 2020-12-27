const Country = require('../models').Country;

async function addCountry(code, fullName, emojiUnicode) {
  const result = Country.create({code, fullName, emojiUnicode});
  return result;
}

async function getCountryId(countryCode) {
  const countryModel = await Country.findOne({where: {code: countryCode}});
  if (!countryModel) {
    throw Error(`Can't find country by code (${countryCode})`);
  }
  return countryModel.id;
}

module.exports = {
  addCountry,
  getCountryId,
};
