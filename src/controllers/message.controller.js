const _ = require('lodash');
const messageService = require('../services/message.service');
const multipleService = require('../services/multiple.service');
const {Success, Failure} = require('../utils/response');

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
  const ipv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try {
    const result = await messageService.getMessage(
        ipv4,
        messageId,
        _.upperCase(countryCode),
        position,
    );
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

  const ipv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try {
    const result = await messageService.getMessages(ipv4,
        _.upperCase(countryCode), type, lastId);
    res.status(200).json(Success(result));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

async function postLikeMessage(req, res, next) {
  const {messageId} = req.params;
  const ipv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

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
  } catch (error) {
    res.status(200).json(Failure(error.message));
  }
}

module.exports = {
  addMessage,
  getMessage,
  getMessages,
  postLikeMessage,
};
