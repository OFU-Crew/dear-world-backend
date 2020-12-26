// const messageService = require('../services/message.service');
const multipleService = require('../services/multiple.service');
const Response = require('../utils/response');

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

module.exports = {
  addMessage,
};
