const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000, DB_PATH = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
mongoose.connect(DB_PATH);
app.use(express.json());
app.use('/', require('./routes'));

app.listen(PORT, () => {});
