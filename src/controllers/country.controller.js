const countryService = require('../services/country.service');
const {Success, Failure} = require('../utils/response');

async function getCountries(req, res, next) {
  try {
    const countries = await countryService.getCountries();
    res.status(200).json(Success({'countries': countries}));
  } catch (err) {
    res.status(200).josin(Failure(err.message));
  }
}

async function getCountryStatus(req, res, next) {
  const {countryId} = req.params;
  try {
    const data = await countryService.getCountryStatus(countryId);
    res.status(200).json(Success(data));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getCountryRank(req, res, next) {
  try {
    const countryRank = await countryService.getCountryRank();
    res.status(200).json(Success(countryRank));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

module.exports = {
  getCountries,
  getCountryStatus,
  getCountryRank,
};
