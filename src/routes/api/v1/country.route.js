const express = require('express');
const router = new express.Router();
const countryController = require('../../../controllers/country.controller');

router.get('/:countryId/status', countryController.getCountryStatus);
router.get('/rank', countryController.getCountryRank);

module.exports = router;
