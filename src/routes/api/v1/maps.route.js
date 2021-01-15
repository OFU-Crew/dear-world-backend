const express = require('express');
const router = new express.Router();
const mapController = require('../../../controllers/map.controller');

router.get('/', mapController.getMaps);

module.exports = router;
