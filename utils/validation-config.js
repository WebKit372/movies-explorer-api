const { celebrate, Joi } = require('celebrate');
const { regularExpression } = require('./validator');

module.exports.userPatchValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }).min(1),
});
module.exports.userSignupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
  }),
});
module.exports.userSigninValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
module.exports.flimCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regularExpression),
    trailerLink: Joi.string().required().pattern(regularExpression),
    thumbnail: Joi.string().required().pattern(regularExpression),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
