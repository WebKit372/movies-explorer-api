const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const movieShema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      valdate: {
        validator(v) {
          return /^http(s)?:\/\/(www\.)?[\w\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
        },
        message: 'Некорректный формат URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^http(s)?:\/\/(www\.)?[\w\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
        },
        message: 'Некорректный формат URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^http(s)?:\/\/(www\.)?[\w\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
        },
        message: 'Некорректный формат URL',
      },
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);
module.exports = mongoose.model('movie', movieShema);
