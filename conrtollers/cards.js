const mongoose = require('mongoose');
const Card = require('../models/card');
const { handleError } = require('../errors/errors');

const handleCardLike = (req, res, data) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    data,
    { new: true, runValidators: true },
  )
    .orFail(new mongoose.Error.DocumentNotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new mongoose.Error.DocumentNotFoundError('Запрашиваемая карточка не найдена'))
    .then(() => res.send({ data: 'Карточка успешно удалена' }))
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  handleCardLike(req, res, { $addToSet: { likes: req.user._id } });
};

module.exports.dislikeCard = (req, res) => {
  handleCardLike(req, res, { $pull: { likes: req.user._id } });
};
