const {Op} = require('sequelize');
const moment = require('moment');
const {sequelize, CountryStatus, Message, LikeHistory} = require('../models');

// TODO: Implement
async function addMessage(anonymousUserId, content) {
  const messageModel = await Message.create({
    anonymousUserId: anonymousUserId,
    content: content,
  });
  if (!messageModel) {
    throw Error(`Can't create a message`);
  }
  return messageModel;
}

async function likeMessage(messageId, ipv4) {
  const getMessage = await Message.findOne({
    where: {
      id: {
        [Op.eq]: messageId,
      },
    },
    include: [
      'AnonymousUser',
    ],
  });

  if (!getMessage) {
    throw Error(`The message does not exist`);
  }

  const existLikeHistory = await LikeHistory.findOne({
    where: {
      created_at: {
        [Op.gte]: moment().subtract(1, 'days').toDate(),
      },
    },
  });

  let like = true;

  const countryId = getMessage.AnonymousUser.countryId;
  const countryStatus = await CountryStatus.findOne(
      {where: {countryId: countryId}},
  );

  await sequelize.transaction(async (t) => {
    if (existLikeHistory) {
      await existLikeHistory.destroy({transaction: t});
      getMessage.likeCount -= 1;
      countryStatus.likeCount -= 1;
      like = false;
    } else {
      const likeHistory = await LikeHistory.create({
        messageId: messageId,
        ipv4: ipv4,
      }, {
        transaction: t,
      });
      if (!likeHistory) {
        throw Error(`Can't create a like history`);
      }
      getMessage.likeCount += 1;
      countryStatus.likeCount += 1;
    }
    await getMessage.save({transaction: t});
    await countryStatus.save({transaction: t});
  });
  return {like: like, data: getMessage};
}

module.exports = {
  addMessage,
  likeMessage,
};
