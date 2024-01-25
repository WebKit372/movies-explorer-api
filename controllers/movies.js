const Movie = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
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
    trailer,
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
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    },
  )
    .then((film) => res.send(film))
    .catch(next);
};
module.exports.deleteMovies = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id, (req, res, next) =>{

  })
}
