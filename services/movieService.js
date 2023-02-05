import Schema from '../schemas/index.js';

const createMovie = (movie) => Schema.Movie.create(movie);

const getMovies = () => Schema.Movie.find().lean();

const getMovie = (id) => Schema.Movie.findById(id).lean();

const updateMovie = (id, movie) => Schema.Movie.findByIdAndUpdate(id, movie);

const deleteMovie = (id) => Schema.Movie.findByIdAndDelete(id);

export default {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
