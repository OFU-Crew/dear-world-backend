require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const morgan = require('./middlewares/morgan');
const limiter = require('./middlewares/express_rate_limit');

app.use(morgan);
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

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
