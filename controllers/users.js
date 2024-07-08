const createHttpError = require('http-errors');
const { default: mongoose } = require('mongoose');
const User = require('../models/user');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createHttpError(404, 'Пользователь не найден');
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { runValidators: true, new: true },
    );
    if (!user) {
      throw createHttpError(404, 'Пользователь не найден');
    }
    res.json(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(createHttpError(400, 'Ошибка валидации'));
    }
    if (e.code === 11000) {
      throw createHttpError(409, 'Эта почта уже занята');
    }
    next(e);
  }
};
