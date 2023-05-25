const mongoose = require('mongoose');
const Card = require('../models/card');
const { handleError } = require('../errors/errors');

const checkIsCardNull = (card, res, data = card) => {
  if (card) {
    return res.send({ data });
  }
  throw new mongoose.Error.DocumentNotFoundError('Запрашиваемая карточка не найдена');
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
    .then((card) => checkIsCardNull(card, res, 'Карточка успешно удалена'))
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => checkIsCardNull(card, res))
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => checkIsCardNull(card, res))
    .catch((err) => handleError(err, res));
};
