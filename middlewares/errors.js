const mongoose = require('mongoose');

const BAD_REQUEST = 400;
const INTERVAL_SERVER_ERROR = 500;
const CONFLICTING_REQUEST = 409;

module.exports = (err, req, res, next) => {
  const { statusCode = INTERVAL_SERVER_ERROR, message } = err;
  
  console.log(err)

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(BAD_REQUEST).send({ message: 'Объект с таким id не найден' });
  }

  if (err.code === 11000) {
    return res.status(CONFLICTING_REQUEST).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  }

  return res.status(statusCode).send(statusCode === 500 ? 'На сервере произошла ошибка' : { message });
};
