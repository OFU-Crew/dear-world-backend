const express = require('express');
const router = new express.Router();
const countryController = require('../../../controllers/country.controller');

router.get('/', countryController.getCountries);
router.get('/:countryId/status', countryController.getCountryStatus);
router.get('/rank', countryController.getCountryRank);
router.get('/count', countryController.getCountriesCount);

module.exports = router;
