const jwt = require('jsonwebtoken');
const CustomError = require('../errors');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new CustomError.Unauthorized('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch {
    throw new CustomError.Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
