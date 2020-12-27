// 여러 Service를 사용해야하는 로직 모음
const messageService = require('./message.service');
const userService = require('./anonymous_user.service');
const countryService = require('./country.service');

// TODO: Implement
async function addAnonymousUserAndMessage(
    content, countryCode, emojiId, nickname) {
  // Get Country ID
  const countryId = await countryService.getCountryId(countryCode);

  // Add user
  const anonymousUserId = await userService.addAnonymousUser(countryId, emojiId,
      nickname);

  // Add message
  const message = await messageService.addMessage(anonymousUserId, content);
  return message;
}

module.exports = {
  addAnonymousUserAndMessage,
};
