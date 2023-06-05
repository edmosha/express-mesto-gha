const Card = require('../models/card');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .populate('owner')
    .orFail(new ForbiddenError('Недостаточно прав'))
    .then((card) => res.send({ data: 'Карточка успешно удалена' }))
    .catch(next);
};

const handleCardLike = (req, res, data) => Card.findByIdAndUpdate(
  req.params.cardId,
  data,
  { new: true, runValidators: true },
)
  .populate('owner')
  .populate('likes')
  .orFail(new DocumentNotFoundError('Запрашиваемая карточка не найдена'))
  .then((card) => res.send({ data: card }));

module.exports.likeCard = (req, res, next) => {
  handleCardLike(req, res, { $addToSet: { likes: req.user._id } }).catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  handleCardLike(req, res, { $pull: { likes: req.user._id } }).catch(next);
};
