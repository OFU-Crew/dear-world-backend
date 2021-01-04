const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const {redisDefault} = require('../redis');

const limiter = (prefix) => {
  return rateLimit({
    store: new RedisStore({
      client: redisDefault,
      expiry: 300,
      prefix,
    }),
    windowMs: 1000,
    max: 10,
  });
};

module.exports = limiter;
