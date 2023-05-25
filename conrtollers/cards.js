const Card = require('../models/card');
const { handleError } = require('../errors/errors');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  if (!(name && link && _id)) {
    throw new ValidationError('Переданы некорректные данные для создания карточки');
  }

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId)
    .then((card) => {
      if (card) {
        return res.send(res.send('Карточка успешно удалена'));
      }
      throw new DocumentNotFoundError('Запрашиваемая карточка не найдена');
    })
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new DocumentNotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};
