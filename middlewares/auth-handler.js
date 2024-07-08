const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');

const { JWT_KEY, NODE_ENV } = require('../config');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  // console.log(req.cookies.jwt);
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw createHttpError(401, 'Требуется авторизация');
  // }
  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies.jwt;
  if (!token) {
    throw createHttpError(401, 'Требуется авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'secret-key' : JWT_KEY);
  } catch (e) {
    next(createHttpError(401, 'Ошибка авторизации'));
  }
  req.user = payload;
  next();
};
