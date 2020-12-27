const {Country, CountryStatus} = require('../models');

async function addCountry(code, fullName, emojiUnicode) {
  const result = Country.create({code, fullName, emojiUnicode});
  return result;
}

async function getCountries() {
  const countries = await Country.findAll();
  return countries;
}

async function getCountryId(countryCode) {
  const countryModel = await Country.findOne({where: {code: countryCode}});
  if (!countryModel) {
    throw Error(`Can't find country by code (${countryCode})`);
  }
  return countryModel.id;
}

async function addCountryStatus(countryId, allowDuplicate = false) {
  if (!allowDuplicate) {
    const countryStatus = await CountryStatus.findOne(
        {where: {countryId: countryId}},
    );

    if (countryStatus) {
      throw Error(
          `Can't create duplicate country status with code (${countryId})`,
      );
    }
  }

  const result = await CountryStatus.create({'countryId': countryId});
  return result;
}

async function getCountryStatus(countryId) {
  const countryStatusModel = await CountryStatus.findOne(
      {where: {countryId: countryId},
        include: Country},
  );
  if (!countryStatusModel) {
    throw Error(`Can't find country by id (${countryId})`);
  }

  return countryStatusModel;
}

module.exports = {
  addCountry,
  getCountries,
  getCountryId,
  addCountryStatus,
  getCountryStatus,
};
