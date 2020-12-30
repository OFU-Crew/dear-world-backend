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

const countryService = require('../services/country.service');
async function main() {
  const allCountries = await countryService.getCountries();

  for (const country of allCountries) {
    try {
      await countryService.addCountryStatus(country.get().id);
    } catch (error) {
    }
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
