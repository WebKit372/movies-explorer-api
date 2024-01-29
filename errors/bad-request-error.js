module.exports = class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'Bad Request';
    this.statusCode = 400;
  }
};
