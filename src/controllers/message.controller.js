// const messageService = require('../services/message.service');
const multipleService = require('../services/multiple.service');
const Response = require('../utils/response');
const faker = require('faker');
const {flag, name} = require('country-emoji');

// TODO: Implement addMessage
async function addMessage(req, res, next) {
  const {
    content,
    countryCode,
    emojiUnicode,
    nickname,
  } = req.body;

  if (!content || !countryCode || !nickname || !emojiUnicode) {
    res.status(422).json(Response(-1, 'INVALID_REQUEST_PARAMETERS'));
    return;
  }

  try {
    const result = await multipleService.addAnonymousUserAndMessage(
        content, countryCode, emojiUnicode, nickname,
    );

    res.status(200).json(Response(1, 'SUCCESS', result));
  } catch (err) {
    next(err);
  }
}

function getMessages(req, res, next) {
  const {
    countryId,
    offset,
  } = req.query;

  if (countryId === undefined || offset === undefined) {
    res.status(422).json(Response(-1, 'INVALID_REQUEST_PARAMETERS'));
    return;
  }

  const mockMessages = [];
  const allowedEmoji = '😊🙃🤪🤓🤯😴💩👻👽🤖👾👐🖖✌️🤟🤘🤙👋🐭🦕🦖🐉';

  for (let i = 0; i < 1000; ++i) {
    const countryCode = faker.address.countryCode();
    const countryImage = flag(countryCode);
    const countryFullName = name(countryImage);

    mockMessages.push({
      'uuid': faker.random.uuid(),
      'anonymousUser': {
        'id': i,
        'country': {
          'shortName': countryCode,
          'fullName': countryFullName,
          'image': countryImage,
        },
        'nickname': faker.name.findName(),
        'profileImage': allowedEmoji[
            Math.floor(
                Math.random() * allowedEmoji.length,
            )
        ],
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

  res.status(200).json(Response(1, 'SUCCESS_GET_MESSAGE_LIST', {
    'firstId': mockMessages[Number(offset)].uuid,
    'lastId': mockMessages[Number(offset) + 29].uuid,
    'messages': mockMessages.slice(Number(offset), Number(offset)+30),
  }));
}

module.exports = {
  addMessage,
  getMessages,
};
