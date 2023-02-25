const MovieModel = require("../models/movie");
const UserModel = require("../models/user");

const addMovie = ({ title, category, year, movie, duration, directorId }) => {
  return MovieModel.create({ title, category, year, movie, duration, directorId, comments: [] })
}

const removeMovie = (id) => {
  return MovieModel.findOneAndDelete({ _id: id })
}

const updateMovie = (id, { title, year, movie, duration }) => {
  const update = {
    title,
    year,
    movie,
    duration,
  };
  return MovieModel.findOneAndUpdate({ _id: id }, update, { new: true });
}

const getAllMovies = ({ sort, title, year }) => {
  const query = MovieModel.find().lean().populate('directorId').populate('category')
  if (title) query.where('title', title)
  if (year) query.where('year', year)
  if (sort) query.sort({ year: sort })
  return query.exec()
}

const getMovie = (id) => {
  return MovieModel.findById({ _id: id })
}

const addMovieToFavorites = async (userId, movieId) => {
  await UserModel.findByIdAndUpdate({ _id: userId }, { $push: { favorites: movieId } }).lean();
}

const deleteMovieFromFavorites = async (userId, movieId) => {
  await UserModel.findByIdAndUpdate({ _id: userId }, { $pull: { favorites: movieId } }).lean();
}

module.exports = {
  addMovie,
  removeMovie,
  updateMovie,
  getAllMovies,
  getMovie,
  addMovieToFavorites,
  deleteMovieFromFavorites
};
