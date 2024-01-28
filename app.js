const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./controllers/users');

const app = express();
const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(DB_PATH);
app.use(express.json());
app.use(cookieParser());
app.post('/signin', signin);
app.post('/signup', signup);
app.use('/', auth);
app.use('/', require('./routes'));

app.listen(PORT, () => {});
