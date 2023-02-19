const Movies = require('../../models/Movies');
const Comments = require('../../models/Comments');

const getAllMovies = async ({title, category, director, year, duration}, sortBy = 'title') => {
  const movies = Movies.find({}).sort(`field ${sortBy}`);
  if (title) {
    movies.where('title', title);
  }
  if (category) {
    movies.where('category', category);
  }
  if (director) {
    movies.where('director', director);
  }
  if (year) {
    movies.where('year', year);
  }
  if (duration) {
    movies.where('duration', duration);
  }
  return await movies;
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
  await Comments.deleteMany({movie: movieId});
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
