const morgan = require('morgan');

let morganEnv = null;

if (process.env.NODE_ENV == 'production') {
  morganEnv = morgan('combined');
} else {
  morganEnv = morgan('dev');
}

module.exports = morganEnv;
