const {Country, CountryStatus, Sequelize} = require('../models');

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
      {
        where: {countryId: countryId},
        include: Country,
      },
  );
  if (!countryStatusModel) {
    throw Error(`Can't find country by id (${countryId})`);
  }

  return countryStatusModel;
}

async function getCountryRank() {
  const countryStatusRank = await CountryStatus.findAll(
      {
        attributes: [
          'messageCount',
          'likeCount',
          'population',
          [Sequelize.literal(
              `CASE 
                WHEN message_count DIV 100 < 5 
                  THEN message_count DIV 100
                ELSE 5
              END`,
          ), 'level'],
        ],
        order: [
          ['messageCount', 'DESC'],
        ],
        limit: 10,
        include: [Country],
      },
  );

  return {'countries': countryStatusRank};
}

module.exports = {
  addCountry,
  getCountries,
  getCountryId,
  addCountryStatus,
  getCountryStatus,
  getCountryRank,
};
