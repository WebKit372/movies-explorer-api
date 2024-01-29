const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const CustomError = require('../errors');

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
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new CustomError.Unauthorized('Некорректный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new CustomError.Unauthorized('Некорректный email или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
