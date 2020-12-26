// 여러 Service를 사용해야하는 로직 모음
const messageService = require('./message.service');
const userService = require('./anonymous_user.service');

// TODO: Implement
async function addAnonymousUserAndMessage(
    content, countryCode, emojiUnicode, nickname) {
  // Add user
  await userService.addAnonymousUser();

  // Add message
  await messageService.addMessage();

  return {
    uuid: 'IMUUID',
    createdAt: '2020-02-29T21:02:57.857214+00:00',
  };
}

module.exports = {
  addAnonymousUserAndMessage,
};
