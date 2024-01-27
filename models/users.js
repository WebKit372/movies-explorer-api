const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Некорректный формат электронной почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 30,
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('user', userSchema);
