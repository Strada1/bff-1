const Movie = require('../models/movie');

const getMovies = () => {
  return Movie.find({}).populate('director').populate('comments').lean();
};

const createMovie = ({ title, year, director, duration, category, rating }) => {
  return Movie.create({ title, year, director, duration, category, rating });
};

const updateMovie = (
  id,
  { title, year, director, duration, category, rating }
) => {
  if (Movie.findById(id)) {
    return false;
  }
  return Movie.findByIdAndUpdate(id, {
    title,
    year,
    director,
    duration,
    category,
    rating,
  });
};

const deliteMovie = (id) => {
  if (Movie.findById(id)) {
    return false;
  }
  return Movie.findByIdAndDelete(id);
};

module.exports = { getMovies, createMovie, updateMovie, deliteMovie };
