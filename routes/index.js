const router = require('express').Router();
const movies = require('./movies');
const user = require('./users');
const auth = require('../middlewares/auth');
const { signin, signup } = require('../controllers/users');
const { userSignupValidation, userSigninValidation } = require('../utils/validation-config');

router.post('/signin', userSigninValidation, signin);
router.post('/signup', userSignupValidation, signup);
router.use('/', auth);
router.use('/movies', movies);
router.use('/users', user);
module.exports = router;
