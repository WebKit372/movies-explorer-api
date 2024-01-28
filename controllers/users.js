const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.findById(req.user._id)
    .then((result) => res.send(result));
};
module.exports.patchUsers = (req, res) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.send(result));
};
module.exports.signup = (req, res) => {
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
        .catch((err) => res.status(500).send(err.message));
    })
    .catch((err) => res.status(500).send('qeqweqwe'));
};
module.exports.signin = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'SECRET', { expiresIn: '7d' });
      res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send('Вы авторизированы');
    })
    .catch((err) => res.status(401).send(err.message));
};
