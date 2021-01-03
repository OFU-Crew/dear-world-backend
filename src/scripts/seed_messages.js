const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({path: path.join(__dirname, '../.env.production')});
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: path.join(__dirname, '../.env.test')});
} else if (process.env.NODE_ENV === 'develop' ||
              process.env.NODE_ENV === undefined) {
  dotenv.config({path: path.join(__dirname, '../.env.develop')});
} else {
  throw new Error('process.env.NODE_ENV를 올바르게 설정해주세요!');
}

const multipleService = require('../services/multiple.service');
const {Country, CountryStatus, Emoji} = require('../models');
const faker = require('faker');
const _ = require('lodash');

async function main() {
  try {
    const allCountries = await Country.findAll({
      include: [
        {
          model: CountryStatus,
          as: 'countryStatus',
          requried: true,
        },
      ],
    });
    const allEmojies = await Emoji.findAll({});

    for (let i = 0; i < 10; ++i) {
      let content = faker.lorem.paragraphs(1);

      while (content.length > 300) {
        content = faker.lorem.paragraphs(1);
      }

      const randomCountry = allCountries[
          Math.floor(Math.random() * allCountries.length) + 1
      ];
      const randomEmojId = Math.floor(Math.random() * allEmojies.length) + 1;

      let name = faker.name.firstName() + faker.name.lastName();
      const randNum = Math.floor(Math.random() * 20);

      if (randNum == 0) {
        name += faker.name.title();
      } else if (randNum == 1) {
        name += faker.name.title() + faker.company.companyName();
      } else if (randNum == 2) {
        name = faker.lorem.words(Math.floor(Math.random() * 10) + 5);
      }

      const message = await multipleService.addAnonymousUserAndMessage(
          content,
          _.upperCase(randomCountry.code),
          allEmojies[randomEmojId].id,
          name,
      );

      const randomLikeProbability = Math.floor(Math.random() * 1000) + 1;
      let randomLikeCount = 0;
      if (randomLikeProbability < 995) {
        randomLikeCount = Math.floor(Math.random() * 500);
      } else {
        randomLikeCount = Math.floor(Math.random() * 10001);
      }

      message.likeCount = randomLikeCount;
      message.save();

      randomCountry.countryStatus.likeCount += randomLikeCount;
      randomCountry.countryStatus.messageCount += 1;

      randomCountry.countryStatus.save();
    }
  } catch (error) {
    console.error(error);
  }
}

if (require.main === module) {
  (async () => {
    try {
      main();
    } catch (error) {
      console.error(error);
    }
  })();
}

module.exports = main;
