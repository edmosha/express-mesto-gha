const User = require('../models/user');
const { handleError } = require('../errors/errors');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new DocumentNotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (!(name && about && avatar)) {
    throw new ValidationError('Переданы некорректные данные при создании пользователя');
  }

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  if (!(name && about)) {
    throw new ValidationError('Переданы некорректные данные');
  }

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new DocumentNotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => handleError(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  if (!avatar) {
    throw new ValidationError('Переданы некорректные данные');
  }

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new DocumentNotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => handleError(err, res));
};
