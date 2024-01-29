const Movie = require('../models/movies');
const CustomError = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((result) => res.send(result))
    .catch(next);
};
module.exports.createMovies = (req, res, next) => {
  Movie.create(
    {
      ...req.body,
      owner: req.user._id,
    },
  )
    .then((film) => res.send(film))
    .catch(next);
};
module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((result) => {
      if (result.owner.toString() === req.user._id) {
        result.deleteOne()
          .then(res.send(result));
      } else {
        throw new CustomError.Forbidden('Недостаточно прав');
      }
    })
    .catch(next);
};
