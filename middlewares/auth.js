const jwt = require('jsonwebtoken');
const CustomError = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new CustomError.Unauthorized('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');
  } catch {
    throw new CustomError.Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
