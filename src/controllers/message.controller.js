const messageService = require('../services/message.service');
const multipleService = require('../services/multiple.service');
const {Success, Failure} = require('../utils/response');
const faker = require('faker');
const {flag, name} = require('country-emoji');

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
        content, countryCode.toUpperCase(), emojiId, nickname,
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
        countryCode.toUpperCase(),
        position,
    );
    res.status(200).json(Success(result));
  } catch (err) {
    res.status(200).json(Failure(err.message));
  }
}

function getMessages(req, res, next) {
  const {
    countryId,
    offset,
  } = req.query;

  if (countryId === undefined || offset === undefined) {
    res.status(200).json(Failure('Invalid request parameters'));
    return;
  }

  const mockMessages = [];
  const allowedEmoji = [...'😊🙃🤪🤓🤯😴💩👻👽🤖👾👐🖖✌️🤟🤘🤙👋🐭🦕🦖🐉'];

  for (let i = 0; i < 1000; ++i) {
    let countryCode = faker.address.countryCode();
    if (i % 20 <= 8) {
      countryCode = 'kr';
    } else if (i % 20 <= 12) {
      countryCode = 'jp';
    } else if (i % 20 <= 16) {
      countryCode = 'zh_CN';
    }

    const countryImage = flag(countryCode);
    const countryFullName = name(countryImage);

    let locale = 'en';
    if (countryCode === 'kr') {
      locale = 'ko';
    } else if (countryCode === 'jp') {
      locale = 'ja';
    } else if (countryCode === 'cn') {
      locale = 'zh_CN';
    }

    faker.locale = locale;

    mockMessages.push({
      'uuid': faker.random.uuid(),
      'anonymousUser': {
        'id': i,
        'country': {
          'shortName': countryCode.toUpperCase(),
          'fullName': countryFullName,
          'image': countryImage,
        },
        'nickname': allowedEmoji[
            Math.floor(
                Math.random() * allowedEmoji.length,
            )
        ],
        'profileImage': faker.image.imageUrl(200, 200),
      },
      'content': faker.lorem.paragraphs(Math.floor(Math.random() * 8) + 1),
      'likeCount': faker.random.number(10000),
      'createdAt': faker.date.between(
          new Date('2020-12-01T00:00:00'),
          new Date('2020-12-31T00:00:00'),
      ),
      'like': faker.random.boolean(),
    });
  }

  res.status(200).json(Success({
    'firstId': mockMessages[Number(offset)].uuid,
    'lastId': mockMessages[Number(offset) + 29].uuid,
    'messages': mockMessages.slice(Number(offset), Number(offset)+30),
  }));
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
