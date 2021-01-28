const Redis = require('ioredis');
const {promisify} = require('util');

const redisDefault = new Redis(6379, process.env.REDIS_DEFAULT, {
  retryStrategy(times) {
    return null;
  },
});
const redisReadonly = new Redis(6379, process.env.REDIS_READONLY, {
  retryStrategy(times) {
    return null;
  },
});

const getAsyncDefault = promisify(redisDefault.get).bind(redisDefault);
const getAsyncReadonly = promisify(redisReadonly.get).bind(redisReadonly);

module.exports = {
  redisDefault,
  redisReadonly,
  getAsyncDefault,
  getAsyncReadonly,
};
