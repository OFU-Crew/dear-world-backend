const AnonymousUser = require('../models').AnonymousUser;

async function addAnonymousUser(countryId, emojiId, nickname) {
  const anonymousUserModel = await AnonymousUser.create({
    countryId: countryId,
    emojiId: emojiId,
    nickname: nickname,
  });
  if (!anonymousUserModel) {
    throw Error(`Can't create anonymousUser`);
  }
  return anonymousUserModel.id;
}

module.exports = {
  addAnonymousUser,
};
