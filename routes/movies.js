const router = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { flimCreateValidation, deleteMovieValidation } = require('../utils/validation-config');

router.get('/', getMovies);
router.post('/', flimCreateValidation, createMovies);
router.delete('/:id', deleteMovieValidation, deleteMovies);
module.exports = router;
