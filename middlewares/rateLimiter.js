const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Слишком много запросов, допустимое количество 100 запросов за 15 минут',
});
module.exports.limiter = limiter;
