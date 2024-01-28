const Movie = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((result) => res.send(result))
    .catch(next);
};
module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    },
  )
    .then((film) => res.send(film))
    .catch(next);
};
module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((result) => {
      console.log(result.owner.toString());
      console.log(req.user._id);
      if (result.owner.toString() === req.user._id) {
        result.deleteOne()
          .then(res.send(result));
      } else {
        throw new Error('qweqweqwe');
      }
    })
    .catch((err) => res.status(500).send(err.mesasge));
};
