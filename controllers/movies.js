const { default: mongoose } = require('mongoose');
const createHttpError = require('http-errors');

const Movie = require('../models/movie');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (e) {
    next(e);
  }
};

exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const movieData = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  };
  try {
    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      next(createHttpError(400, 'Ошибка валидации'));
      return;
    }
    next(e);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw createHttpError(404, 'Фильм по указанному id не найден');
    }
    if (movie.owner.toString() !== req.user._id) {
      throw createHttpError(403, 'Нет прав на удаление этого фильма');
    }
    await movie.deleteOne();
    res.json(movie);
  } catch (e) {
    next(e);
  }
};
