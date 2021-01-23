const express = require('express');
const router = new express.Router();
const reportController = require('../../../controllers/report.controller');

router.post('/', reportController.postReport);

module.exports = router;
