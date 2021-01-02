const _ = require('lodash');
const {Op} = require('sequelize');
const clone = require('clone');
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
const RECENT_MESSAGE_THRESHOLD = 30;
const WEEKLY_HOT_MESSAGE_THRESHOLD = 100;
const MessagePositionOption = Object.freeze({
  CURR: 'curr',
  PREV: 'prev',
  NEXT: 'next',
});
const MessageTypeOption = Object.freeze({
  RECENT: 'recent',
  WEEKLY_HOT: 'weekly_hot',
});
const findMessageBaseOption = {
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

async function getMessages(ipv4, countryCode, type, prevLastId) {
  const findOption = clone(findMessageBaseOption);

  if (countryCode) {
    _.set(findOption, 'include.0.include.0.where', {
      code: {
        [Op.eq]: countryCode,
      },
    });
  }

  if (!type || type === MessageTypeOption.RECENT) {
    findOption.limit = RECENT_MESSAGE_THRESHOLD;
    findOption.order = [
      ['id', 'DESC'],
    ];
    if (prevLastId) {
      _.set(findOption, 'where.id', {
        [Op.lt]: prevLastId,
      });
    }
  } else if (type === MessageTypeOption.WEEKLY_HOT) {
    _.set(findOption, 'where.createdAt', {
      [Op.gte]: moment().subtract(7, 'days').toDate(),
    });
    _.set(findOption, 'where.likeCount', {
      [Op.gt]: 0,
    });
    findOption.limit = WEEKLY_HOT_MESSAGE_THRESHOLD;
    findOption.order = [
      ['likeCount', 'DESC'],
    ];
  } else {
    throw Error(`Invalid messageTypeOption (${type})`);
  }

  const messageModels = await Message.findAll(findOption);
  const messageCount = _.get(messageModels, 'length', 0);
  const firstId = !messageCount ? null : messageModels[0].get('id');
  const lastId = !messageCount ? null :
      messageModels[messageModels.length - 1].get('id');
  const messages = !messageCount ? [] : messageModels.map((model) => {
    const data = model.get();
    data.like = false; // TODO: 좋아요 데이터 긁어서 넣기
    return data;
  });
  return {
    firstId,
    lastId,
    messageCount,
    messages,
  };
}

async function getMessage(ipv4, messageId, countryCode, position) {
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

  const findOption = clone(findMessageBaseOption);
  Object.assign(findOption,
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
  getMessages,
  likeMessage,
};
