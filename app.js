const express = require('express');
const mongoose = require('mongoose');

const app = express();
const {PORT = 3000, DB_PATH = 'mongods://127/0/0/1:27017/bitfilmsdb'} = process.env;
mongoose.connect(DB_PATH);
app.use(express.json());
