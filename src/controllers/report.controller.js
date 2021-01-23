// const _ = require('lodash');
const reportService = require('../services/report.service');
const {Success, Failure} = require('../utils/response');

async function postReport(req, res, next) {
  try {
    const result = await reportService.postReport();
    return res.status(200).json(Success(result));
  } catch (error) {
    return res.status(200).json(Failure(error));
  }
}

module.exports = {
  postReport,
};
