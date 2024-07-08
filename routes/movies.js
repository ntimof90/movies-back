const router = require('express').Router();

const { getMovies, deleteMovie, createMovie } = require('../controllers/movies');
const { idValidator, movieValidator } = require('../middlewares/validator');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:id', idValidator, deleteMovie);

module.exports = router;
