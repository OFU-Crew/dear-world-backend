const {Op} = require('sequelize');
const _ = require('lodash');
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
          'imageUrl',
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

async function getCountryStatus(countryCode) {
  const getCountryStatus = await CountryStatus.findOne({
    attributes: [
      'id',
      'messageCount',
      'likeCount',
    ],
    include: {
      model: Country,
      as: 'country',
      attributes: [
        'id',
        'code',
        'fullName',
        'emojiUnicode',
        'imageUrl',
      ],
      where: {
        code: {
          [Op.eq]: countryCode,
        },
      },
    },
  });

  if (!getCountryStatus) {
    throw Error(`Can't find country by code (${countryCode})`);
  }

  return _.omit(getCountryStatus.toJSON(), ['country']);
}

async function getCountriesCount() {
  const countriesCount = await Country.findAll(
      {
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
          'imageUrl',
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

async function getCountryCount(countryCode) {
  const countryCount = await Country.findOne(
      {
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
          'imageUrl',
        ],
        where: {
          code: {
            [Op.eq]: countryCode,
          },
        },
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

  return countryCount;
}

async function getCountriesRank() {
  const countryStatusRank = await Country.findAll(
      {
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
          'imageUrl',
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
        raw: true,
        nest: true,
      },
  );

  return {'ranking': countryStatusRank};
}

async function getCountryStatusMessageCount(countryCode) {
  countryCode = countryCode || null;

  if (countryCode !== null) {
    countryCode = countryCode.toUpperCase();
  }

  if (countryCode === null) {
    const allMessageCount = await CountryStatus.findAll({
      attributes: [
        [
          Sequelize.fn(
              'sum',
              Sequelize.col('message_count'),
          ),
          'sumMessageCount',
        ],
      ],
      raw: true,
    });

    return {
      'country': 'all',
      'messageCount': Number(allMessageCount[0].sumMessageCount),
    };
  } else {
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
          'imageUrl',
        ],
        where: {
          code: {
            [Op.eq]: countryCode,
          },
        },
      },
    });

    return {
      'country': countryCode,
      'messageCount': countryMessageCount.messageCount,
    };
  }
}

module.exports = {
  addCountry,
  getCountries,
  getCountryId,
  addCountryStatus,
  getCountryStatus,
  getCountryCount,
  getCountriesCount,
  getCountriesRank,
  getCountryStatusMessageCount,
};
