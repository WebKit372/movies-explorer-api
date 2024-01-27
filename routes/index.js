const router = require('express').Router();
const movies = require('./movies');
const user = require('./users');

router.use('/movies', movies);
router.use('/users', user);
module.exports = router;
