const express = require('express');
const router = new express.Router();
const countryController = require('../../../controllers/country.controller');

router.get('/', countryController.getCountries);
router.get('/:countryCode/status', countryController.getCountryStatus);
router.get('/rank', countryController.getCountriesRank);
router.get('/:countryCode/rank', countryController.getCountryRank);
router.get('/messagecount', countryController.getCountryStatusMessageCount);
router.get('/count', countryController.getCountriesCount);
router.get('/:countryCode/count', countryController.getCountryCount);

module.exports = router;
