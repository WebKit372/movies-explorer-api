const router = require('express').Router();
const movies = require('./movies');
const user = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { signin, signup } = require('../controllers/users');
const { userSignupValidation, userSigninValidation } = require('../utils/validation-config');

router.post('/signin', userSigninValidation, signin);
router.post('/signup', userSignupValidation, signup);
router.use('/', auth);
router.use('/movies', movies);
router.use('/users', user);
router.use('/*', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  return next(new NotFoundError('Некорректный путь'));
});
module.exports = router;
