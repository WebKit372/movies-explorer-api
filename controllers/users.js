const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const CustomError = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((result) => res.send(result))
    .catch(next);
};
module.exports.patchUsers = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError.BadRequest('Некорректный формат'));
      } else if (err.code === 11000) {
        next(new CustomError.Conflict('Пользователь с указанным email уже существует'));
      } else {
        next(err);
      }
    });
};
module.exports.signup = (req, res, next) => {
  const { name = 'Default', email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((result) => {
          const userInfo = result.toObject();
          delete userInfo.password;
          res.send(userInfo);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CustomError.BadRequest('Некорректный формат'));
          } else if (err.code === 11000) {
            next(new CustomError.Conflict('Пользователь с указанным email уже существует'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};
module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET', { expiresIn: '7d' });
      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Вы авторизированы' });
    })
    .catch(next);
};
module.exports.logout = (req, res, next) => {
  User.findById(req.user._id)
    .then(() => {
      res.clearCookie('token').send({ message: 'Вы разлогинились' });
    })
    .catch(next);
};
