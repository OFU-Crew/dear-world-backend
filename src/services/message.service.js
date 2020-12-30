const {Op} = require('sequelize');
const moment = require('moment');
const {
  sequelize,
  AnonymousUser,
  Country,
  CountryStatus,
  Message,
  LikeHistory,
} = require('../models');

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
    attributes: [
      'id',
      'content',
      'likeCount',
      'createdAt',
    ],
    include: {
      model: AnonymousUser,
      as: 'anonymousUser',
      attributes: [
        'id',
        'nickname',
        'emojiId',
      ],
      required: true,
      include: {
        model: Country,
        as: 'country',
        attributes: [
          'id',
          'code',
          'fullName',
          'emojiUnicode',
        ],
        required: true,
        include: {
          model: CountryStatus,
          as: 'countryStatus',
          attributes: [
            'id',
            'messageCount',
            'likeCount',
            'population',
          ],
          required: true,
        },
      },
    },
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

  const countryStatus = getMessage.anonymousUser.country.countryStatus;

  await sequelize.transaction(async (t) => {
    if (existLikeHistory) {
      if (getMessage.likeCount == 0) {
        throw Error('The message like cannot decrease');
      }

      if (countryStatus.likeCount == 0) {
        throw Error('The country status like cannot decrease');
      }

      getMessage.likeCount -= 1;
      countryStatus.likeCount -= 1;
      await existLikeHistory.destroy({transaction: t});
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
    await getMessage.save({transaction: t, silent: true});
    await countryStatus.save({transaction: t, silent: true});
  });

  return {like: like, data: getMessage};
}

module.exports = {
  addMessage,
  likeMessage,
};
