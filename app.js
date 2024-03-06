require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorCatcher = require('./middlewares/errorCatcher');

const { limiter } = require('./middlewares/rateLimiter');

const app = express();
const { PORT = 3000, DB_PATH, NODE_ENV } = process.env;
app.use(cors({
  origin: [
    'http://webkitdiploma.nomoredomainsmonster.ru',
    'https://webkitdiploma.nomoredomainsmonster.ru',
    'localhost:3001',
    'http://localhost:3001',
  ],
  credentials: true,
}));
mongoose.connect(NODE_ENV === 'production' ? DB_PATH : 'mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/', require('./routes'));

app.use(errorLogger);
app.use(errors());
app.use(errorCatcher);
app.listen(PORT, () => {});
