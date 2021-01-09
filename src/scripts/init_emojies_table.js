const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({path: path.join(__dirname, '../../.env.production')});
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: path.join(__dirname, '../../.env.test')});
} else if (process.env.NODE_ENV === 'develop' ||
              process.env.NODE_ENV === undefined) {
  dotenv.config({path: path.join(__dirname, '../../.env.develop')});
} else {
  throw new Error('process.env.NODE_ENV를 올바르게 설정해주세요!');
}

const dataList = [
  '1F970',
  '1F60D',
  '1F917',
  '1F92F',
  '1F973',
  '1F496',
  '1F647',
  '1F643',
  '1F6CC',
  '1F6C0',
  '1F42F',
  '1F340',
  '1F37F',
  '1F957',
  '1F37B',
  '1F3D6',
  '1F305',
  '1F381',
  '1F4EE',
  '1F4C6',
  '1F47D',
];

const emojiService = require('../services/emoji.service');
async function main() {
  for (const data of dataList) {
    try {
      await emojiService.addEmoji(data);
    } catch (error) {
    }
  }
}

if (require.main === module) {
  (async () => {
    try {
      main();
    } catch (error) {
      console.error(error);
    }
  })();
}

module.exports = main;
