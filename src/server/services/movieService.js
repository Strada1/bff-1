const MovieModel = require("../models/movie");

const addMovie = ({ title, category, year, movie, duration, directorId }) => {
  return MovieModel.create({ title, category, year, movie, duration, directorId, comments: [] })
}

const removeMovie = ({ id }) => {
  return MovieModel.findOneAndDelete(id)
}

const updateMovie = (id, { title, year, movie, duration }) => {
  const update = {
    title,
    year,
    movie,
    duration,
  };
  return MovieModel.findOneAndUpdate(id, update, { new: true });
}

const getAllMovies = (sort, title, year) => {
  const query = MovieModel.find().populate('directorId').populate('category')
  if (title) query.where('title', title)
  if (year) query.where('year', year)
  if (sort) query.sort({ year: sort })
  return query.exec()
}

const getMovie = (id) => {
  return MovieModel.findById(id)
}

module.exports = { addMovie, removeMovie, updateMovie, getAllMovies, getMovie };