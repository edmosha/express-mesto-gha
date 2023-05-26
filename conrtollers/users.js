const mongoose = require('mongoose');
const User = require('../models/user');
const { handleError } = require('../errors/errors');

const updateUser = (req, res, data) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    data,
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new mongoose.Error.DocumentNotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};
