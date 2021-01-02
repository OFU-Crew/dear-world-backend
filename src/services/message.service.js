const _ = require('lodash');
const {Op} = require('sequelize');
const moment = require('moment');
const {
  sequelize,
  AnonymousUser,
  Country,
  CountryStatus,
  Emoji,
  Message,
  LikeHistory,
} = require('../models');
const MessagePositionOption = Object.freeze({
  CURR: 'curr',
  PREV: 'prev',
  NEXT: 'next',
});

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

async function getMessage(ipv4, messageId, countryCode, position) {
  const findBaseOption = {
    attributes: [
      'id',
      'content',
      'likeCount',
      'createdAt',
    ],
    include: [
      {
        model: AnonymousUser,
        as: 'anonymousUser',
        attributes: [
          'id',
          'nickname',
        ],
        required: true,
        include: [
          {
            model: Country,
            as: 'country',
            attributes: [
              'code',
              'fullName',
              'emojiUnicode',
            ],
            required: true,
          },
          {
            model: Emoji,
            as: 'emoji',
            attributes: [
              'unicode',
            ],
            required: true,
          },
        ],
      },
    ],
  };
  const findCustomOption = {
    [MessagePositionOption.CURR]: {
      where: {
        id: {
          [Op.eq]: messageId,
        },
      },
    },
    [MessagePositionOption.PREV]: {
      where: {
        id: {
          [Op.lt]: messageId,
        },
      },
      order: [['id', 'DESC']],
    },
    [MessagePositionOption.NEXT]: {
      where: {
        id: {
          [Op.gt]: messageId,
        },
      },
    },
  };

  const findOption = Object.assign(findBaseOption,
      findCustomOption[position || MessagePositionOption.CURR]);
  if ((position === MessagePositionOption.PREV ||
      position === MessagePositionOption.NEXT) && countryCode) {
    _.set(findOption, 'include.0.include.0.where', {
      code: {
        [Op.eq]: countryCode,
      },
    });
  }
  const messageModel = await Message.findOne(findOption);
  if (!messageModel) {
    throw Error(`Can't find a message`);
  }
  const messageData = messageModel.get();
  messageData.like = false; // TODO(sanghee): 아이피 기반으로 좋아요 데이터 읽어서 적용하기
  return messageData;
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
      if (getMessage.likeCount === 0) {
        throw Error('The message like cannot decrease');
      }

      if (countryStatus.likeCount === 0) {
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
  getMessage,
  likeMessage,
};
