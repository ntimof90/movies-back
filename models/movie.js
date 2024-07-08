const { Schema, SchemaType, model } = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: 'Требуется URL-адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: 'Требуется URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: 'Требуется URL-адрес',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

movieSchema.index({ nameEN: 1, nameRU: 1 });

module.exports = model('movie', movieSchema);
