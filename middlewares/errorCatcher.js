module.exports = (err, req, res, next) => {
  const { statusCode = 500, message, name = 'Internal Server' } = err;
  res
    .status(statusCode)
    .send({
      error: `${name}`,
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
