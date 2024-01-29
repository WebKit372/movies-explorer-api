const BadRequest = require('./bad-request-error');
const Forbidden = require('./forbidden-error');
const NotFound = require('./not-found-error');
const Unauthorized = require('./unauthorized-error');
const Conflict = require('./conflict-error');

module.exports = {
  BadRequest,
  Forbidden,
  NotFound,
  Unauthorized,
  Conflict,
};
