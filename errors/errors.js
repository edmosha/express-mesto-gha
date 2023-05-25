const mongoose = require('mongoose');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERVAL_SERVER_ERROR = 500;

module.exports.handleError = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({ message: err.query });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(NOT_FOUND).send({ message: 'Объект с таким id не найден' });
  }

  return res.status(INTERVAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
};
