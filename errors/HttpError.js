module.exports = class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = 500;
  }
};
