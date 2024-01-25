const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.findById(req.User.id)
};
module.exports.patchUsers = (req,res) => {

};