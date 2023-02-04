const Movies = require('../../models/Movies');

const getAllMovies = async () => {
  const allMovies = await Movies.find({});
  return allMovies;
};

const addMovie = async (movie) => {
  await Movies.create(movie);
};

const updateMovie = async (movieId, movie) => {
  await Movies.findByIdAndUpdate({ _id: movieId }, movie);
};
const deleteMovie = async (movieId) => {
  await Movies.findByIdAndDelete(movieId);
};

module.exports = {
  getAllMovies,
  addMovie,
  updateMovie,
  deleteMovie
};
