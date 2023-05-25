const HttpError = require('./HttpError');

module.exports = class ValidationError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
};
