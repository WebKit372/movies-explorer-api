const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.findById(req.User.id)
    .then((result) => res.send(result));
};
module.exports.patchUsers = (req, res) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.User.id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.send(result));
};
module.exports.signup = (req, res) => {
  const {name = 'Default', email, password } = req.body;
  User.create({
    name,
    email,
    password,
  })
  .then()
}