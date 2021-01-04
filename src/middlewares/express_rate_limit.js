const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const {redisDefault} = require('../redis');

const limiter = rateLimit({
  store: new RedisStore({
    client: redisDefault,
    expiry: 300,
  }),
  windowMs: 1000,
  max: 10,
});

module.exports = limiter;
