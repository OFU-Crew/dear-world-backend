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
const ENDPOINT_URL = 'https://dear-world.live';
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

function addShareLinkToMessage(targetMessage, messageId) {
  targetMessage.shareLink = `${ENDPOINT_URL}/messages/${messageId}`;
}

async function addMessage(anonymousUserId, content) {
  let createdMessage = {};

  await sequelize.transaction(async (t) => {
    createdMessage = await Message.create({
      anonymousUserId: anonymousUserId,
      content: content,
    }, {
      transaction: t,
    });

    if (!createdMessage) {
      throw Error(`Can't create a message`);
    }

    const getAnoynymousUser = await AnonymousUser.findOne({
      attributes: [
        'id',
        'nickname',
      ],
      where: {
        'id': {
          [Op.eq]: anonymousUserId,
        },
      },
      include: [
        {
          model: Country,
          as: 'country',
          required: true,
          include: [
            {
              model: CountryStatus,
              as: 'countryStatus',
              required: true,
            },
          ],
        },
      ],
    });

    const getCountryStatus = getAnoynymousUser.country.countryStatus;
    getCountryStatus.messageCount += 1;

    await getCountryStatus.save({transaction: t, silent: true});
  });
  addShareLinkToMessage(createdMessage, createdMessage.id);
  return createdMessage;
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
      [Op.gte]: moment.utc().subtract(7, 'days').toDate(),
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

  const messageModels = await Message.findAll(findOption) || [];
  const messageCount = messageModels.length;
  const firstId = messageModels.length > 0 ? messageModels[0].get('id') : null;
  const lastId = messageModels.length > 0 ?
      messageModels[messageModels.length - 1].get('id') : null;
  const messageIdList = messageModels.map((model) => model.get('id'));
  const likedMessageModelList = await LikeHistory.findAll({
    where: {
      ipv4: {
        [Op.eq]: ipv4,
      },
      createdAt: {
        [Op.gte]: moment().subtract(1, 'days').toDate(),
      },
      messageId: messageIdList,
    },
  }) || [];
  const likedMessageIdList = likedMessageModelList.map(
      (model) => model.get('messageId'));
  const messages = messageModels.map((model) => {
    const data = model.get();
    data.like = likedMessageIdList.includes(data.id);
    addShareLinkToMessage(data, data.id);
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
  const existLikeHistory = await LikeHistory.findOne({
    where: {
      messageId: {
        [Op.eq]: messageId,
      },
      ipv4: {
        [Op.eq]: ipv4,
      },
      createdAt: {
        [Op.gte]: moment().subtract(1, 'days').toDate(),
      },
    },
  });
  messageData.like = !!existLikeHistory;
  addShareLinkToMessage(messageData, messageData.id);
  return messageData;
}

async function likeMessage(messageId, ipv4) {
  const findOption = clone(findMessageBaseOption);
  _.set(findOption, 'where.id', {
    [Op.eq]: messageId,
  });
  _.set(findOption, 'include.0.include.0', {
    model: Country,
    as: 'country',
    attributes: [
      'code',
      'fullName',
      'emojiUnicode',
    ],
    required: true,
    include: {
      model: CountryStatus,
      as: 'countryStatus',
      required: true,
    },
  });

  const getMessage = await Message.findOne(findOption);

  if (!getMessage) {
    throw Error(`The message does not exist`);
  }

  const existLikeHistory = await LikeHistory.findOne({
    where: {
      messageId: {
        [Op.eq]: messageId,
      },
      createdAt: {
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

  const messageData = getMessage.get();
  messageData.like = like;
  addShareLinkToMessage(messageData, getMessage.id);

  const omitMessageData = _.omit(
      messageData,
      'anonymousUser.dataValues.country.dataValues.countryStatus',
  );

  return omitMessageData;
}

module.exports = {
  addMessage,
  getMessage,
  getMessages,
  likeMessage,
};
