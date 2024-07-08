const { celebrate, Joi } = require('celebrate');

const urlRegexp = /^https?:\/\/(w{3}\.)?([a-z\d-]+\.)+([a-z]+)\/[a-zA-Z\d-._~:/?#$[\]@!$&'()*+,;=]$/;

exports.signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

exports.updateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

exports.idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

exports.movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegexp),
    trailerLink: Joi.string().required().pattern(urlRegexp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegexp),
    movieId: Joi.number().required(),
  }),
});
