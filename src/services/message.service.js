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
  let messageModel = null;
  if (position === MessagePositionOption.NEXT) {
    const nextMessageModel = await Message.findOne({
      attributes: [
        'id',
        'content',
        'likeCount',
        'createdAt',
      ],
      include: [
        {
          model: AnonymousUser,
          attributes: [
            'id',
            'nickname',
          ],
          required: true,
          include: [
            {
              model: Country,
              attributes: [
                'code',
                'fullName',
                'emojiUnicode',
              ],
              required: true,
              where: {
                code: {
                  [Op.eq]: countryCode,
                },
              },
            },
            {
              model: Emoji,
              attributes: [
                'unicode',
              ],
              required: true,
            },
          ],
        },
      ],
      where: {
        id: {
          [Op.gt]: messageId,
        },
      },
    });
    messageModel = nextMessageModel;
  } else if (position === MessagePositionOption.PREV) {
    const prevMessageModel = await Message.findOne({
      attributes: [
        'id',
        'content',
        'likeCount',
        'createdAt',
      ],
      include: [
        {
          model: AnonymousUser,
          attributes: [
            'id',
            'nickname',
          ],
          required: true,
          include: [
            {
              model: Country,
              attributes: [
                'code',
                'fullName',
                'emojiUnicode',
              ],
              required: true,
              where: {
                code: {
                  [Op.eq]: countryCode,
                },
              },
            },
            {
              model: Emoji,
              attributes: [
                'unicode',
              ],
              required: true,
            },
          ],
        },
      ],
      where: {
        id: {
          [Op.lt]: messageId,
        },
      },
      order: [
        ['id', 'DESC'],
      ],
    });
    messageModel = prevMessageModel;
  } else {
    const currMessageModel = await Message.findOne({
      attributes: [
        'id',
        'content',
        'likeCount',
        'createdAt',
      ],
      include: [
        {
          model: AnonymousUser,
          attributes: [
            'id',
            'nickname',
          ],
          required: true,
          include: [
            {
              model: Country,
              attributes: [
                'code',
                'fullName',
                'emojiUnicode',
              ],
              required: true,
            },
            {
              model: Emoji,
              attributes: [
                'unicode',
              ],
              required: true,
            },
          ],
        },
      ],
      where: {
        id: {
          [Op.eq]: messageId,
        },
      },
    });
    messageModel = currMessageModel;
  }

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
    include: [
      {
        model: AnonymousUser,
        attributes: [
          'id',
          'nickname',
          'emojiId',
        ],
        include: {
          model: Country,
          attributes: [
            'id',
            'code',
            'fullName',
            'emojiUnicode',
          ],
          include: {
            model: CountryStatus,
            attributes: [
              'id',
              'messageCount',
              'likeCount',
              'population',
            ],
          },
        },
      },
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

  const countryStatus = getMessage.AnonymousUser.Country.CountryStatus;

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
    await getMessage.save({transaction: t});
    await countryStatus.save({transaction: t});
  });
  return {like: like, data: getMessage};
}

module.exports = {
  addMessage,
  getMessage,
  likeMessage,
};
