const countryService = require('../services/country.service');
const {Success, Failure} = require('../utils/response');
const {redisDefault, getAsyncReadonly} = require('../redis');

async function getCountries(req, res, next) {
  const countriesKey = 'countries';

  try {
    const reply = await getAsyncReadonly(countriesKey);

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const countries = await countryService.getCountries();

    redisDefault.set(countriesKey, JSON.stringify({countries}));
    redisDefault.expire(
        countriesKey,
        31 * 24 * 60 * 60,
    );

    res.status(200).json(Success({countries}));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getCountryStatus(req, res, next) {
  const {countryCode} = req.params;
  const countriesStatusKey = `countriesStatus-${countryCode}`;

  try {
    const reply = await getAsyncReadonly(countriesStatusKey);

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const data = await countryService.getCountryStatus(countryCode);

    redisDefault.set(countriesStatusKey, JSON.stringify(data));
    redisDefault.expire(
        countriesStatusKey,
        10,
    );

    res.status(200).json(Success(data));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getCountriesCount(req, res, next) {
  const countriesCountKey = 'countriesCount';

  try {
    const reply = await getAsyncReadonly(countriesCountKey);

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const countriesCount = await countryService.getCountriesCount();

    redisDefault.set(countriesCountKey, JSON.stringify(countriesCount));
    redisDefault.expire(
        countriesCountKey,
        5 * 60,
    );

    res.status(200).json(Success(countriesCount));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getCountryCount(req, res, next) {
  const {countryCode} = req.params;
  const countryCountKey = `countriesCount-{countryCode}`;

  try {
    const reply = await getAsyncReadonly(countryCountKey);

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const countryCount = await countryService.getCountryCount(countryCode);

    redisDefault.set(countryCountKey, JSON.stringify(countryCount));
    redisDefault.expire(
        countryCountKey,
        60,
    );

    res.status(200).json(Success(countryCount));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getCountryRank(req, res, next) {
  const countriesRankKey = 'countriesRank';

  try {
    const reply = await getAsyncReadonly(countriesRankKey);

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const countryRank = await countryService.getCountryRank();

    redisDefault.set(countriesRankKey, JSON.stringify(countryRank));
    redisDefault.expire(
        countriesRankKey,
        5,
    );

    res.status(200).json(Success(countryRank));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getCountryStatusMessageCount(req, res, next) {
  const {countryCode} = req.query;
  const messageCountKey = `messageCountKey-${countryCode || 'all'}`;

  try {
    const reply = await getAsyncReadonly(messageCountKey);

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const messageCount = await countryService.getCountryStatusMessageCount(
        countryCode,
    );

    redisDefault.set(messageCountKey, JSON.stringify(messageCount));
    redisDefault.expire(
        messageCountKey,
        10,
    );
    res.status(200).json(Success(messageCount));
  } catch (error) {
    res.status(200).json(Failure(error.message));
  }
}

module.exports = {
  getCountries,
  getCountryStatus,
  getCountriesCount,
  getCountryCount,
  getCountryRank,
  getCountryStatusMessageCount,
};
