const maps = require('../configs/map_config');
const {Success} = require('../utils/response');

async function getMaps(req, res, next) {
  res.status(200).json(Success({maps}));
}

module.exports = {
  getMaps,
};
