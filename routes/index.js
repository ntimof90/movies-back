const router = require('express').Router();
const createHttpError = require('http-errors');

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth-handler');

router.use('/', authRouter);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(createHttpError(404, 'Ресурс не найден'));
});

module.exports = router;
