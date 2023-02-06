const Movies = require('../../models/Movies');

const getAllMovies = async () => {
  const allMovies = await Movies.find({}).lean();
  return allMovies;
};
const getMovieById = async (movieId) => {
  const movie = await Movies.findById(movieId).populate('director').populate('comments').populate('category').lean();
  return movie;
};
const addMovie = async (movie) => {
  await Movies.create(movie);
};
const updateMovie = async (movieId, movie) => {
  await Movies.findByIdAndUpdate(movieId, movie);
};
const deleteMovie = async (movieId) => {
  await Movies.findByIdAndDelete(movieId);
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
