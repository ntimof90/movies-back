const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const {
  NODE_ENV,
  PORT,
  mongoUrl,
  allowedCors,
} = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/rate-limiter');

const app = express();
app.use(cors({ origin: allowedCors }));
app.use(limiter);
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(mongoUrl, { family: 4 });

app.listen(NODE_ENV === 'production' ? PORT : 3000);
