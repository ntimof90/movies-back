module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .json({
      statusCode,
      message: statusCode !== 500 ? message : 'Ошибка сервера',
    });
};
