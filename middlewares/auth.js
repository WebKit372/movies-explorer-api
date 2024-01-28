const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch {
    res.status(400).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
