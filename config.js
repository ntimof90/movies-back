require('dotenv').config();

const { NODE_ENV, PORT, JWT_KEY } = process.env;

const mongoUrl = 'mongodb://localhost:27017/bitfilmsdb';

const allowedCors = ['http://localhost:3000'];

module.exports = {
  NODE_ENV,
  PORT,
  JWT_KEY,
  mongoUrl,
  allowedCors,
};
