const redis = require('redis');
const {promisify} = require('util');

const redisDefault = redis.createClient(process.env.REDIS_DEFAULT);
const redisReadonly = redis.createClient(host=process.env.REDIS_READONLY);

const getAsyncDefault = promisify(redisDefault.get).bind(redisDefault);
const getAsyncReadonly = promisify(redisReadonly.get).bind(redisReadonly);

module.exports = {
  redisDefault,
  redisReadonly,
  getAsyncDefault,
  getAsyncReadonly,
};
