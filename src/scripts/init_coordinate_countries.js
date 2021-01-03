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
