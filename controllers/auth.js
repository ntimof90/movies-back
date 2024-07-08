const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../models/user');
const { NODE_ENV, JWT_KEY } = require('../config');

const getToken = (user) => {
  const { _id } = user;
  return jwt.sign(
    { _id },
    NODE_ENV !== 'production' ? 'secret-key' : JWT_KEY,
    { expiresIn: '7d' },
  );
};

exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    user.password = undefined;
    const token = getToken(user);
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });
    res.status(201).json({ user, token });
  } catch (e) {
    if (e.code === 11000) {
      next(createError(409, 'Эта почта уже занята'));
      return;
    }
    next(e);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw createError(401, 'Неправильные почта или пароль');
    }
    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      throw createError(401, 'Неправильные почта или пароль');
    }
    const token = getToken(user);
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });
    res.json({ token });
  } catch (e) {
    next(e);
  }
};

exports.signout = (req, res, next) => {
  try {
    res.clearCookie('jwt').end();
  } catch (e) {
    next(e);
  }
};
