const { HttpError } = require('./HttpError');

module.exports.handleError = (err, res) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: 'Произошла ошибка' });
};
