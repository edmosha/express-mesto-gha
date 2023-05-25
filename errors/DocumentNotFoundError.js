const HttpError = require('./HttpError');

module.exports = class DocumentNotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFoundError';
    this.statusCode = 404;
  }
};
