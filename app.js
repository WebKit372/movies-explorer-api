const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./controllers/users');
const errorCatcher = require('./middlewares/errorCatcher');
const { userSignupValidation, userSigninValidation } = require('./utils/validation-config');

const app = express();
const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(DB_PATH);
app.use(express.json());
app.use(cookieParser());
app.post('/signin', userSigninValidation, signin);
app.post('/signup', userSignupValidation, signup);
app.use('/', auth);
app.use('/', require('./routes'));

app.use(errors());
app.use(errorCatcher);
app.listen(PORT, () => {});
