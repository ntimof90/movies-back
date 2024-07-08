const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: isEmail,
        message: 'Требуется email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Иван',
    },
  },
  {
    versionKey: false,
  },
);

userSchema.index({ email: 1 }, { unique: true });

module.exports = model('user', userSchema);
