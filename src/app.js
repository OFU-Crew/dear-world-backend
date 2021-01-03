const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({path: path.join(__dirname, '../.env.production')});
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: path.join(__dirname, '../.env.test')});
} else if (process.env.NODE_ENV === 'develop' ||
              process.env.NODE_ENV === undefined) {
  dotenv.config({path: path.join(__dirname, '../.env.develop')});
} else {
  throw new Error('process.env.NODE_ENV를 올바르게 설정해주세요!');
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const morgan = require('./middlewares/morgan');
const limiter = require('./middlewares/express_rate_limit');
const db = require('./models');
const cors = require('cors');
const {
  scriptCountry,
  scriptCountryStatus,
  scriptEmoji,
} = require('./scripts');

app.use(morgan);
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(router);
app.use((req, res, next) => {
  res.status(404).send('Not found');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});


const syncOptions = {};
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions)
    .then(async () => {
      if (process.env.NODE_ENV === 'test') {
        await scriptCountry();
        await scriptCountryStatus();
        await scriptEmoji();
      }

      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Listening at ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
