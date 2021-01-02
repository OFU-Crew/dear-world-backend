const {Op} = require('sequelize');
const {Country, CountryStatus, Sequelize} = require('../models');

async function addCountry(code, fullName, emojiUnicode) {
  const result = Country.create({code, fullName, emojiUnicode});
  return result;
}

async function getCountries() {
  const countries = await Country.findAll(
      {
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
        ],
      },
  );
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
        {
          where: {
            countryId: countryId,
          },
        },
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
        where: {
          countryId: countryId,
        },
        attributes: [
          'id',
          'messageCount',
          'likeCount',
        ],
      },
  );
  if (!countryStatusModel) {
    throw Error(`Can't find country by id (${countryId})`);
  }

  return countryStatusModel;
}

async function getCountriesCount() {
  const countriesCount = await Country.findAll(
      {
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
        ],
        include: [
          {
            model: CountryStatus,
            as: 'countryStatus',
            required: true,
            attributes: [
              'id',
              'messageCount',
              'likeCount',
              [Sequelize.literal(
                  `CAST(CASE 
                WHEN message_count DIV 100 < 5
                  THEN message_count DIV 100
                ELSE 5
              END AS UNSIGNED)`,
              ), 'level'],
              'population',
            ],
          },
        ],
      },
  );

  return {'countries': countriesCount};
}

async function getCountryRank() {
  const countryStatusRank = await Country.findAll(
      {
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
        ],
        include: [
          {
            model: CountryStatus,
            as: 'countryStatus',
            required: true,
            attributes: [
              'id',
              'messageCount',
              'likeCount',
              [Sequelize.literal(
                  `CAST(CASE 
              WHEN message_count DIV 100 < 5
                THEN message_count DIV 100
              ELSE 5
            END AS UNSIGNED)`,
              ), 'level'],
              'population',
            ],
          },
        ],
        order: [
          [
            {
              model: CountryStatus,
              as: 'countryStatus',
            },
            'messageCount',
            'DESC',
          ],
        ],
        limit: 10,
      },
  );

  return {'ranking': countryStatusRank};
}

async function getCountryStatusMessageCount(type, countryCode) {
  type = type || 'all';
  countryCode = countryCode || null;

  if (countryCode !== null) {
    countryCode = countryCode.toUpperCase();
  }

  if (type !== 'all' && type !== 'country') {
    throw Error(`Invalid type parameter`);
  }

  if (type === 'country' && countryCode === null) {
    throw Error(`Invalid countryCode parameter`);
  }

  if (type === 'all') {
    const allMessageCount = await CountryStatus.findAll(
        {
          attributes: [
            [
              Sequelize.fn(
                  'max',
                  Sequelize.col('message_count'),
              ),
              'sumMessageCount',
            ],
          ],
          raw: true,
        },
    );

    return {'type': 'all', 'count': allMessageCount[0].sumMessageCount};
  } else if (type === 'country') {
    const countryMessageCount = await CountryStatus.findOne({
      attributes: [
        'messageCount',
      ],
      include: {
        model: Country,
        as: 'country',
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
        ],
        where: {
          code: {
            [Op.eq]: countryCode,
          },
        },
      },
    });

    return {'type': 'country', 'count': countryMessageCount.messageCount};
  }
}

module.exports = {
  addCountry,
  getCountries,
  getCountryId,
  addCountryStatus,
  getCountryStatus,
  getCountriesCount,
  getCountryRank,
  getCountryStatusMessageCount,
};
