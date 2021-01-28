const _ = require('lodash');
const messageService = require('../services/message.service');
const multipleService = require('../services/multiple.service');
const {Success, Failure} = require('../utils/response');
const {redisDefault, getAsyncReadonly} = require('../redis');

// TODO: Implement addMessage
async function addMessage(req, res, next) {
  const {
    content,
    countryCode,
    emojiId,
    nickname,
  } = req.body;

  if (!content || !countryCode || !nickname || !emojiId) {
    res.status(200).json(Failure('Invalid body'));
    return;
  }

  try {
    const result = await multipleService.addAnonymousUserAndMessage(
        content, _.upperCase(countryCode), emojiId, nickname,
    );

    res.status(200).json(Success(result));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getMessage(req, res, next) {
  const {
    messageId,
  } = req.params;
  const {
    countryCode,
    position,
  } = req.query;
  const getMessageKey = `message-${messageId}`;

  const ipv4 = req.headers['x-forwarded-for'] !== undefined ?
                req.headers['x-forwarded-for'].split(',').shift().trim() :
                req.connection.remoteAddress;
  try {
    let reply = null;
    if (redisDefault.status !== 'end') {
      reply = await getAsyncReadonly(getMessageKey);
    }

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const result = await messageService.getMessage(
        ipv4,
        messageId,
        _.upperCase(countryCode),
        position,
    );

    if (redisDefault.status !== 'end') {
      redisDefault.set(getMessageKey, JSON.stringify(result));
      redisDefault.expire(
          getMessageKey,
          5,
      );
    }

    res.status(200).json(Success(result));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function getMessages(req, res, next) {
  const {
    countryCode,
    type,
    lastId,
  } = req.query;
  const getMessagesKey = `message-${countryCode ||
    'whole-world'}-${type ||
       'recent'}-${lastId ||
         'initial'}`;

  const ipv4 = req.headers['x-forwarded-for'] !== undefined ?
                req.headers['x-forwarded-for'].split(',').shift().trim() :
                req.connection.remoteAddress;
  try {
    const reply = null;
    if (redisDefault.status !== 'end') {
      reply = await getAsyncReadonly(getMessagesKey);
    }

    if (reply !== null) {
      res.status(200).json(Success(JSON.parse(reply)));
      return;
    }

    const result = await messageService.getMessages(ipv4,
        _.upperCase(countryCode), type, lastId);

    if (redisDefault.status !== 'end') {
      redisDefault.set(getMessagesKey, JSON.stringify(result));
      redisDefault.expire(
          getMessagesKey,
          1,
      );
    }

    res.status(200).json(Success(result));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function postLikeMessage(req, res, next) {
  const {messageId} = req.params;
  const ipv4 = req.headers['x-forwarded-for'] !== undefined ?
                req.headers['x-forwarded-for'].split(',').shift().trim() :
                req.connection.remoteAddress;

  if (messageId === undefined) {
    res.status(200).json(Failure('messageId must be exist'));
    return;
  }

  try {
    const messageModelAfterLike = await messageService.likeMessage(
        messageId,
        ipv4,
    );
    res.status(200).json(Success(messageModelAfterLike));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

module.exports = {
  addMessage,
  getMessage,
  getMessages,
  postLikeMessage,
};
